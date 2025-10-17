import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import localforage from "localforage";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { TinyEditor } from "@/components/tiny-editor";
import { useDisclosure } from "@/hooks";
import {
  useDocument,
  useDocumentCreate,
  useDocumentUpdate,
} from "@/services/documents.service";
import { useExperimentSelect } from "@/services/experiment.service";
import { Document, DocumentCreate } from "@/types/documents";
import { useNavigate } from "@tanstack/react-router";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "tiny_platform",
  storeName: "tiny_platform",
});

interface DocumentFormProps {
  id?: string;
}

export function DocumentForm({ id }: DocumentFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form] = Form.useForm<DocumentCreate>();
  const experimentId = Form.useWatch("experiment_id", form);
  const navigate = useNavigate({ from: "/dashboard/documents/create" });

  const { data: templateData, isLoading } = useDocument(id);
  const { data: experimentsOptions } = useExperimentSelect();
  const { mutateAsync: createTemplate, isPending: createIsLoading } =
    useDocumentCreate();
  const { mutateAsync: updateTemplate, isPending: updateIsLoading } =
    useDocumentUpdate(id);

  const [content, setContent] = useState<string>();

  const defaultValue = useMemo(() => {
    if (experimentsOptions) {
      const experiment = experimentsOptions.find(
        (experiment) => experiment.value === id
      );

      return {
        label: `${experiment?.value} - ${experiment?.label}`,
        value: experiment?.value,
      };
    }
    return {
      label: "",
      value: "",
    };
  }, [experimentsOptions, id]);

  const onFinish = async (values: DocumentCreate) => {
    if (id) {
      updateTemplate({
        name: values.name,
        content,
        experiment_id: values.experiment_id,
      })
        .then(() => {
          toast.success("Documento atualizado com sucesso");
        })
        .catch(() => {
          toast.error("Erro ao atualizar documento");
        });
    } else {
      createTemplate({
        name: values.name,
        content: content || "",
        experiment_id: values.experiment_id,
      }).then(() => {
        localforage
          .removeItem("tiny_platform_document_data")
          .then(() => {
            form.resetFields();
            toast.success("Template adicionado com sucesso");
          })
          .catch(() => {
            toast.error("Erro ao adicionar documento");
          });
      });
    }
  };

  const handleChange = (contentData?: string) => {
    setContent(contentData);

    setTimeout(() => {
      const values = form.getFieldsValue();
      if (id && contentData) {
        localforage.setItem<DocumentCreate>(`document_update_${id}`, {
          content: contentData,
          name: values.name,
          experiment_id: values.experiment_id,
        });
        return;
      }

      localforage.setItem<DocumentCreate>("document_create", values);
    }, 2000);
  };

  const handleOk = () => {
    localforage
      .getItem<DocumentCreate>(`document_update_${id}`)
      .then((localData) => {
        form.setFieldsValue({
          content: localData?.content,
          name: localData?.name,
          experiment_id: String(localData?.experiment_id),
        });
        onClose();
      });

    localforage.removeItem(`document_update_${id}`).then(() => onClose());
  };

  const handleCancel = (iTemplateData?: Document) => {
    localforage.removeItem(`document_update_${id}`).then(() => {
      form.setFieldsValue({
        content: iTemplateData?.content,
        name: iTemplateData?.name,
        experiment_id: String(iTemplateData?.experiment_id),
      });
      onClose();
    });
  };

  useEffect(() => {
    if (!id) {
      localforage.getItem<string>("document_create").then((localData) => {
        if (localData) {
          form.setFieldsValue({
            content: localData,
          });
          setContent(localData);
        }
      });
    }
    if (id && templateData && !isLoading) {
      localforage.getItem<string>(`document_update_${id}`).then((localData) => {
        if (localData) {
          onOpen();
        } else {
          form.setFieldsValue({
            content: templateData.content,
            name: templateData.name,
            experiment_id: templateData.experiment_id,
          });
          setContent(templateData.content);
        }
      });
    }
  }, [id, templateData, isLoading, form, onOpen]);

  useEffect(() => {
    navigate({
      search: { experimentId: experimentId || undefined },
    });
  }, [experimentId, navigate]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Título"
                name="name"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "O título é obrigatório",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Laboratório"
                name="experiment_id"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Por favor, selecione uma opção.",
                  },
                ]}
                initialValue={defaultValue?.value}
              >
                <Select
                  allowClear
                  optionFilterProp="label"
                  showSearch
                  options={experimentsOptions}
                />
              </Form.Item>
              <Form.Item
                label="Conteúdo"
                name="content"
                style={{ width: "100%" }}
              >
                <TinyEditor onChange={handleChange} value={content} />
              </Form.Item>
              <Form.Item>
                <Space direction="vertical" align="center" className="w-full">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={createIsLoading || updateIsLoading}
                  >
                    Salvar
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Aviso!"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => handleCancel(templateData)}
        okText="Carregar"
        cancelText="Cancelar"
      >
        <Typography.Text>
          Você possui um rascunho salvo, deseja carregá-lo? Se não, ele será
          excluído.
        </Typography.Text>
      </Modal>
    </>
  );
}
