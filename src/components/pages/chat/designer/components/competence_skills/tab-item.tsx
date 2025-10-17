import { Button, Card, Form, Input, InputNumber, Space } from "antd";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { Fragment } from "react";

import { MinusCircleOutlined } from "@ant-design/icons";
import { SkillForm } from "./form/skill-form";

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

interface Props {
  tabKey: string;
}

export function DesignerCompetenceTabItem({ tabKey }: Props) {
  return (
    <>
      <Form.List name={`${tabKey}_correlated`}>
        {(fields, { add, remove }, { errors }) => (
          <Fragment key={nanoid()}>
            <Space size="small" direction="vertical" className="w-full">
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
                      <Space
                        direction="vertical"
                        className="w-full"
                        size="small"
                      >
                        <Form.Item
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Por favor, informe a área do conhecimento",
                            },
                          ]}
                          label="Área do conhecimento"
                          name={[field.name, "area_do_conhecimento"]}
                          className="mb-0!"
                        >
                          <Input placeholder="Digite o código da competência" />
                        </Form.Item>
                        <div className="ml-4">
                          <Form.List
                            initialValue={[
                              {
                                code_object: 1,
                                object_name: "",
                              },
                            ]}
                            name={[field.name, "competencias"]}
                            rules={[
                              {
                                validator: async (_, names) => {
                                  if (!names || names.length < 1) {
                                    return Promise.reject(
                                      new Error(
                                        "Por favor, adicione pelo menos um objeto."
                                      )
                                    );
                                  }
                                },
                              },
                            ]}
                          >
                            {(
                              second_fields,
                              { add: add_object, remove: remove_object },
                              { errors: second_errors }
                            ) => (
                              <Space
                                key={nanoid()}
                                size="small"
                                direction="vertical"
                                className="w-full"
                              >
                                {second_fields.map(
                                  (second_field, second_index) => (
                                    <Card hoverable key={nanoid()}>
                                      <Form.Item
                                        key={second_field.key}
                                        {...(second_index === 0
                                          ? formItemLayout
                                          : formItemLayoutWithOutLabel)}
                                        required={false}
                                      >
                                        <div className="flex items-start ">
                                          <Space
                                            direction="vertical"
                                            className="w-full"
                                            size="small"
                                          >
                                            <Form.Item
                                              validateTrigger={[
                                                "onChange",
                                                "onBlur",
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "Por favor, informe o código da competência",
                                                },
                                                {
                                                  type: "number",
                                                  message:
                                                    "O código da competência deve ser um número",
                                                },
                                              ]}
                                              label="Código da competência"
                                              name={[
                                                second_field.name,
                                                "codigo_da_competencia",
                                              ]}
                                              className="mb-0!"
                                            >
                                              <InputNumber
                                                placeholder="Digite o código do objeto"
                                                min={1}
                                                style={{ width: "50%" }}
                                              />
                                            </Form.Item>
                                            <Form.Item
                                              validateTrigger={[
                                                "onChange",
                                                "onBlur",
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    "Por favor, informe o nome da categoria",
                                                },
                                              ]}
                                              label="Nome da Categoria"
                                              name={[
                                                second_field.name,
                                                "category_name",
                                              ]}
                                              className="mb-0!"
                                            >
                                              <Input placeholder="Digite o nome da categoria" />
                                            </Form.Item>
                                            <Form.Item
                                              validateTrigger={[
                                                "onChange",
                                                "onBlur",
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    "Por favor, informe a descrição",
                                                },
                                              ]}
                                              label="Descrição"
                                              name={[
                                                second_field.name,
                                                "descricao_da_competencia",
                                              ]}
                                              className="mb-0!"
                                            >
                                              <Input.TextArea
                                                rows={4}
                                                placeholder="Adicione uma descrição"
                                              />
                                            </Form.Item>

                                            <div className="ml-4">
                                              <SkillForm
                                                name={second_field.name}
                                              />
                                            </div>
                                          </Space>
                                          {second_fields.length > 1 ? (
                                            <MinusCircleOutlined
                                              className="ml-2"
                                              onClick={() =>
                                                remove_object(second_field.name)
                                              }
                                            />
                                          ) : null}
                                        </div>
                                      </Form.Item>
                                    </Card>
                                  )
                                )}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add_object()}
                                    icon={<PlusIcon className="h-4 w-4" />}
                                    block
                                  >
                                    Adicionar objeto
                                  </Button>
                                  <Form.ErrorList errors={second_errors} />
                                </Form.Item>
                              </Space>
                            )}
                          </Form.List>
                        </div>
                      </Space>

                      <MinusCircleOutlined
                        className="ml-2 text-red-700! hover:text-red-600!"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                </Card>
              ))}
            </Space>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusIcon className="h-4 w-4" />}
                block
              >
                Adicionar habilidade e competência
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
    </>
  );
}
