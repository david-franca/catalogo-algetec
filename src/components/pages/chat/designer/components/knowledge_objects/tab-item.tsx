import { Button, Card, Form, Input, Space } from "antd";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { Fragment } from "react";

import { MinusCircleOutlined } from "@ant-design/icons";

import { CategoriesForm } from "./form/categories-form";

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
                              whitespace: true,
                              message:
                                "Por favor, informe o nome da área de competência",
                            },
                          ]}
                          label="Área de Competência"
                          name={[field.name, "competency_area_name"]}
                          className="mb-0!"
                        >
                          <Input placeholder="Digite o nome da área de competência" />
                        </Form.Item>
                        <Form.Item
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Por favor, informe o nome do componente curricular",
                            },
                          ]}
                          label="Componente Curricular"
                          name={[field.name, "curriculum_component"]}
                          className="mb-0!"
                        >
                          <Input placeholder="Digite o nome do componente curricular" />
                        </Form.Item>
                        <CategoriesForm name={field.name} />
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
                Adicionar objeto de conhecimento aplicável
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
    </>
  );
}
