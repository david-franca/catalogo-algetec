import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Modal } from "antd";

import { useAuth } from "@/hooks";
import { useExperimentSelect } from "@/services/experiment.service";
import { useIssueShow, useIssueUpdate } from "@/services/issue.service";
import { useIssueTagSelect } from "@/services/issueTag.service";
import { useUserSelect } from "@/services/user.service";
import { ISSUES_STATUS, IssuesUpdate } from "@/types/issue";
import { PRIORITY } from "@/utils/handlePriority";
import { InboxOutlined, SaveOutlined } from "@ant-design/icons";
import { acceptMimeTypes } from "./mimeTypes";

interface IssueEditFormProps {
  id: string | undefined;
}
export function IssueEditForm({ id }: IssueEditFormProps) {
  const [form] = Form.useForm<IssuesUpdate>();
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

  const showUploadInfoModal = () => {
    Modal.info({
      title: "Formato ou tamanho inválido",
      content: (
        <div>
          <p>Formatos permitidos:</p>
          <ul>
            {acceptMimeTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
          <p>Tamanho máximo permitido: {MAX_FILE_SIZE_MB}MB</p>
        </div>
      ),
      okText: "Entendi",
    });
  };

  const { user } = useAuth();
  const { data: issueData, isLoading: isIssueLoading } = useIssueShow(id);
  const { data: experimentsOptions, isLoading: isExperimentsLoading } =
    useExperimentSelect();
  const { data: usersOptions, isLoading: isUsersLoading } = useUserSelect();
  const { data: issueTagOptions, isLoading: isIssueTagLoading } =
    useIssueTagSelect();

  const isPermission = (): boolean =>
    user?.role.admin ? true : user?.department.name === "Testing";
  const isResponsible = (): boolean => user?.id === issueData?.responsible_id;
  const isDisabled = (status?: boolean): boolean =>
    !(isPermission() || (isResponsible() && status));

  const { mutateAsync: updateIssue, isPending } = useIssueUpdate(id);

  const onFinish = (values: IssuesUpdate) => {
    let dataValues: IssuesUpdate = {};
    if (isDisabled()) {
      dataValues.status = values.status;
    } else {
      dataValues = values;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataValues));
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    if (id) {
      updateIssue(formData)
        .then(() => {
          toast.success("Problema atualizado com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao atualizar problema!");
        });
    }
  };

  useEffect(() => {
    if (issueData) {
      form.setFieldsValue({
        problem: issueData.problem,
        status: issueData.status as ISSUES_STATUS,
        experiment_id: issueData.experiment_id,
        responsible_id: issueData.responsible_id.toString(),
        description: issueData.description,
        priority: issueData.priority as PRIORITY,
        tags: issueData.issueTags.map((tag) => tag.id.toString()),
        approved: issueData.approved,
      });
    }
  }, [form, issueData]);

  return (
    <Card loading={isIssueLoading}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Problema"
          name="problem"
          rules={[
            {
              required: true,
              message: "O título do problema é obrigatório",
            },
          ]}
        >
          <Input disabled={isDisabled()} />
        </Form.Item>
        <Form.Item label="Aprovado" name="approved">
          <Radio.Group
            disabled={isDisabled()}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio value>Sim</Radio>
            <Radio value={false}>Não</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            disabled={isDisabled(true)}
            allowClear
            options={[
              {
                label: ISSUES_STATUS.NEW,
                value: ISSUES_STATUS.NEW,
              },
              {
                label: ISSUES_STATUS.IS_NOT_ERROR,
                value: ISSUES_STATUS.IS_NOT_ERROR,
              },
              {
                label: ISSUES_STATUS.DUPLICATE,
                value: ISSUES_STATUS.DUPLICATE,
              },
              {
                label: ISSUES_STATUS.NO_REMOVE,
                value: ISSUES_STATUS.NO_REMOVE,
              },
              {
                label: ISSUES_STATUS.RESOLVED,
                value: ISSUES_STATUS.RESOLVED,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Experimento"
          name="experiment_id"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            disabled={isExperimentsLoading || isDisabled()}
            optionFilterProp="label"
            loading={isExperimentsLoading}
            showSearch
            options={experimentsOptions}
          />
        </Form.Item>
        <Form.Item
          label="Responsável"
          name="responsible_id"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            disabled={isUsersLoading || isDisabled()}
            loading={isUsersLoading}
            allowClear
            showSearch
            options={usersOptions}
          />
        </Form.Item>
        <Form.Item label="Descrição" name="description">
          <Input.TextArea disabled={isDisabled()} rows={5} />
        </Form.Item>
        <Form.Item
          label="Gravidade"
          name="priority"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            allowClear
            disabled={isDisabled()}
            options={[
              {
                label: "Baixa",
                value: PRIORITY.LOW,
              },
              {
                label: "Normal",
                value: PRIORITY.NORMAL,
              },
              {
                label: "Alta",
                value: PRIORITY.HIGH,
              },
              {
                label: "Critica",
                value: PRIORITY.CRITICAL,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Ambiente" name="tags">
          <Select
            disabled={isIssueTagLoading || isDisabled()}
            loading={isIssueTagLoading}
            allowClear
            showSearch
            mode="multiple"
            options={issueTagOptions}
          />
        </Form.Item>
        <Form.Item label="Arquivos" name="files">
          <Upload.Dragger
            disabled={isDisabled()}
            fileList={fileList}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              const isAcceptedType = acceptMimeTypes.includes(file.type);
              const isAcceptedSize = file.size <= MAX_FILE_SIZE;
              if (!isAcceptedType || !isAcceptedSize) {
                showUploadInfoModal();
                return Upload.LIST_IGNORE;
              }
              setFileList((prev) => {
                const files = [...prev];
                files.push(file);
                return files;
              });
              return false;
            }}
            accept={acceptMimeTypes.join(", ")}
            showUploadList
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste o arquivo para esta área para carregar
            </p>
            <p className="ant-upload-hint">
              Suporte para um carregamento único ou em massa. Estritamente
              proibido de fazer upload de dados da empresa ou outros arquivos
              proibidos.
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Divider />
        <Form.Item>
          <Space direction="vertical" className="w-full" align="center">
            <Button
              disabled={isDisabled(true)}
              type="primary"
              htmlType="submit"
              loading={isPending}
              icon={<SaveOutlined />}
            >
              Salvar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
