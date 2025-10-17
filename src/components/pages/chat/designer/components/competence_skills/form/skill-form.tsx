import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Switch } from "antd";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";

interface Props {
  name: number;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
  },
};

export function SkillForm({ name }: Props) {
  return (
    <Form.List
      initialValue={[
        {
          code_object: 1,
          object_name: "",
        },
      ]}
      name={[name, "habilidades"]}
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 1) {
              return Promise.reject(
                new Error("Por favor, adicione pelo menos um objeto.")
              );
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <Space
          key={nanoid()}
          size="small"
          direction="vertical"
          className="w-full"
        >
          {fields.map((field, index) => (
            <Card hoverable key={nanoid()}>
              <Form.Item
                key={field.key}
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                required={false}
              >
                <div className="flex items-start ">
                  <Space direction="vertical" className="w-full" size="small">
                    <Form.Item
                      validateTrigger={["onChange", "onBlur"]}
                      label="Em foco nas análises?"
                      name={[field.name, "on_focus"]}
                      className="mb-0!"
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Sim" unCheckedChildren="Nao" />
                    </Form.Item>
                    <Form.Item
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "Por favor, informe o código da habilidade",
                        },
                      ]}
                      label="Código da habilidade"
                      name={[field.name, "codigo_da_habilidade"]}
                      className="mb-0!"
                    >
                      <Input placeholder="Digite o código do objeto" />
                    </Form.Item>
                    <Form.Item
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Por favor, informe a descrição da habilidade",
                        },
                      ]}
                      label="Descrição da habilidade"
                      name={[field.name, "descricao_da_habilidade"]}
                      className="mb-0!"
                    >
                      <Input.TextArea placeholder="Digite a descrição" />
                    </Form.Item>
                  </Space>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="ml-2"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              </Form.Item>
            </Card>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              icon={<PlusIcon className="h-4 w-4" />}
              block
            >
              Adicionar habilidade
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </Space>
      )}
    </Form.List>
  );
}
