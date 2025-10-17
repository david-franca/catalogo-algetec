import { Button, Card, Form, Input, Space } from "antd";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";

import { MinusCircleOutlined } from "@ant-design/icons";

import { ObjectForm } from "./object-form";

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

export function CategoriesForm({ name }: Props) {
  return (
    <div className="ml-4">
      <Form.List
        name={[name, "categories"]}
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
        initialValue={[{ category_name: "1" }]}
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
                            message: "Por favor, informe o nome do objeto",
                          },
                        ]}
                        label="Nome da Categoria"
                        name={[field.name, "category_name"]}
                        className="mb-0!"
                      >
                        <Input placeholder="Digite o nome da categoria" />
                      </Form.Item>
                      <ObjectForm name={field.name} />
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
                Adicionar categoria
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Space>
        )}
      </Form.List>
    </div>
  );
}
