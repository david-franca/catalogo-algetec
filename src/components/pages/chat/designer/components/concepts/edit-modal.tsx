import { Button, Divider, Drawer, Form, Input, Space, Switch } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";
import { DesignerConceptsBody } from "@/types/designer";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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
  conceitos: DesignerConceptsBody[];
}

export default function DesignerConceptsEditModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setConcepts, conceitos } = useDesigner();

  const onFinish = (values: FormValues) => {
    setConcepts(values);
    toast.success("Procedimentos atualizados com sucesso!");
    onClose();
  };

  useEffect(() => {
    if (conceitos) {
      form.setFieldsValue({ conceitos });
    }
  }, [conceitos, form]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Conceitos"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.List
          name="conceitos"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos um conceito")
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
                            message: "Por favor, informe o nome do conceito",
                          },
                        ]}
                        label="Nome"
                        name={[field.name, "nome"]}
                        className="mb-0!"
                      >
                        <Input placeholder="Digite o nome do conceito" />
                      </Form.Item>
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
                        label="Já abordado?"
                        name={[field.name, "ja_abordado"]}
                        className="mb-0!"
                        valuePropName="checked"
                      >
                        <Switch
                          checkedChildren="Sim"
                          unCheckedChildren="Nao"
                          defaultChecked
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
                  Adicionar conceito
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
