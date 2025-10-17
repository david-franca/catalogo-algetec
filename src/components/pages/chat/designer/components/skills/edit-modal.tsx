import { Button, Divider, Drawer, Form, Input, Space } from "antd";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";
import { Habilidade } from "@/types/designer";
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
  skills: Habilidade[];
}

export default function DesignerSkillsEditModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setSkills, skills } = useDesigner();

  const onFinish = (values: FormValues) => {
    setSkills(values);
    toast.success("Habilidades atualizadas com sucesso!");
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Habilidades"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={{ skills }}
        layout="vertical"
      >
        <Form.List
          name="skills"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos uma habilidade")
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
                            message: "Por favor, informe o nome da habilidade",
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
                  Adicionar habilidade
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
