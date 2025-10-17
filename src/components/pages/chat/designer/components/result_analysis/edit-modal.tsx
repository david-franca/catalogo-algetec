import { Button, Drawer, Form, Input } from "antd";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";
import { ResultAnalysis } from "@/types/designer";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
  },
};

interface FormValues {
  result_analysis: ResultAnalysis[];
}

export default function DesignerResultAnalysisModal({
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  const { setResultAnalysis, result_analysis } = useDesigner();

  const onFinish = (values: FormValues) => {
    setResultAnalysis(values);
    toast.success("Análises de Resultados atualizadas com sucesso!");
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="50%"
      title="Editar Análises de Resultados"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        initialValues={{ result_analysis }}
      >
        <Form.List
          name="result_analysis"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Por favor, adicione pelo menos uma análise")
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
                  key={field.key}
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  required={false}
                >
                  <Form.Item
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Por favor, informe a questão",
                      },
                    ]}
                    noStyle
                    name={[field.name, "question"]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Digite a questão"
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
                  Adicionar análise
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
