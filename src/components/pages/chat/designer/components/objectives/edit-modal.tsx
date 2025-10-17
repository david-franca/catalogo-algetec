import { Button, Divider, Drawer, Form, Input, Select, Space } from "antd";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";
import { KnowledgeObjectives } from "@/types/designer";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    // sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
  },
};

interface FormValues {
  knowledge_objectives: KnowledgeObjectives[];
}

export default function DesignerObjectivesEditModal({
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setKnowledgeObjectives, knowledge_objectives, procedures } =
    useDesigner();

  const proceduresOptions = useMemo(() => {
    if (!procedures) return [];
    return procedures.map((p, i) => ({ value: i + 1, label: p.procedure }));
  }, [procedures]);

  const onFinish = (values: FormValues) => {
    setKnowledgeObjectives(values);
    toast.success("Objetivos de aprendizagem atualizados com sucesso!");
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Objetivos de Aprendizagem"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={{ knowledge_objectives }}
        layout="vertical"
      >
        <Form.List
          name="knowledge_objectives"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos um objetivo")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  key={field.key}
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  required={false}
                >
                  <div className="flex items-start ">
                    <Space direction="vertical" className="w-full" size="small">
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Por favor, informe a descrição do conceito",
                          },
                        ]}
                        label="Descrição"
                        name={[field.name, "descricao"]}
                        className="mb-0!"
                      >
                        <Input.TextArea
                          placeholder="Digite a descrição do conceito"
                          rows={4}
                        />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Por favor, informe o nome do conceito",
                          },
                        ]}
                        label="Relação com a prática"
                        name={[field.name, "relacao_com_a_pratica"]}
                        className="mb-0!"
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Digite a relação com a prática"
                        />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Por favor, informe a avaliação do objetivo",
                          },
                        ]}
                        label="Avaliação do objetivo"
                        name={[field.name, "avaliacao_do_objetivo"]}
                        className="mb-0!"
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Digite a avaliação do objetivo"
                        />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Por favor, informe o tipo do conceito",
                          },
                        ]}
                        label="Tipo"
                        name={[field.name, "tipo"]}
                        className="mb-0!"
                      >
                        <Input placeholder="Digite o tipo do conceito" />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message:
                              "Por favor, selecione pelo menos um procedimento",
                          },
                        ]}
                        label="Procedimentos relacionados"
                        name={[field.name, "procedimentos_relacionados"]}
                        className="mb-0!"
                      >
                        <Select
                          mode="multiple"
                          placeholder="Selecione"
                          options={proceduresOptions}
                        />
                      </Form.Item>
                    </Space>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="ml-2"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                  <Divider />
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Adicionar habilidade de aprendizagem
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
