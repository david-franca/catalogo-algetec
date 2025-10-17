import { Button, Divider, Drawer, Form, Input, Space } from "antd";
import { nanoid } from "nanoid";
import { Fragment } from "react";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";
import { Procedure } from "@/types/designer";
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
  procedures: Procedure[];
}

export default function DesignerProceduresEditModal({
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setProcedures, procedures } = useDesigner();

  const onFinish = (values: FormValues) => {
    setProcedures(values.procedures);
    toast.success("Procedimentos atualizados com sucesso!");
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Procedimentos"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={{ procedures }}
        layout="vertical"
      >
        <Form.List
          name="procedures"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos um procedimento")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <Fragment key={nanoid()}>
              {fields.map((field, index) => (
                <Form.Item
                  key={nanoid()}
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
                              "Por favor, informe o nome do material necessário",
                          },
                        ]}
                        label="Procedimento"
                        name={[field.name, "procedure"]}
                        className="mb-0!"
                      >
                        <Input placeholder="Digite o nome do procedimento" />
                      </Form.Item>

                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Por favor, informe o texto intermediário do procedimento",
                          },
                        ]}
                        label="Texto intermediário"
                        name={[field.name, "intermediate_text"]}
                        className="mb-0!"
                      >
                        <Input.TextArea
                          placeholder="Digite o texto intermediário do procedimento"
                          rows={4}
                        />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={["onChange", "onBlur"]}
                        label="Dica cognitiva"
                        name={[field.name, "cognitive_hint"]}
                        className="mb-0!"
                      >
                        <Input.TextArea
                          placeholder="Digite a dica cognitiva do procedimento"
                          rows={4}
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
                  Adicionar procedimento
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </Fragment>
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
