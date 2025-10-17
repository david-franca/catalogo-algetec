import { useDesigner } from "@/hooks/useDesigner";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Typography } from "antd";
import { toast } from "sonner";
import { Fragment } from "react";
import { nanoid } from "nanoid";

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
  necessary_materials: string[];
}

export default function DesignerMaterialEditModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setNecessaryMaterials, necessary_materials } = useDesigner();

  const onFinish = (values: FormValues) => {
    setNecessaryMaterials(values.necessary_materials);
    toast.success("Materiais atualizados com sucesso!");
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Materiais Necessários"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={{
          necessary_materials,
        }}
      >
        <Form.List
          name="necessary_materials"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos um material")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <Fragment key={nanoid()}>
              <Typography.Text>Materiais Necessários:</Typography.Text>
              {fields.map((field, index) => (
                <Form.Item
                  key={nanoid()}
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  required={false}
                >
                  <Form.Item
                    key={field.key}
                    name={field.name}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Por favor, informe o nome do material necessário",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Digite o nome do material"
                      style={{ width: "90%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="ml-2"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Adicionar material
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
