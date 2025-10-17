import { useLocaleCreate } from "@/services/locale.service";
import { FormLocale } from "@/types/locales";
import { completeVersion } from "@/utils/completeVersion";
import { handleLanguageName } from "@/utils/handleLanguageName";
import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";
import { useState } from "react";

interface MassEditorFormProps {
  locale: FormLocale;
}

export interface FormValues {
  experiment_id: string;
  user: string;
  version: string;
  language: string;
  content: {
    key: string;
    value: string;
  }[];
}

export function MasEditForm({ locale }: MassEditorFormProps) {
  const [form] = Form.useForm<FormValues>();

  const { mutateAsync, isPending } = useLocaleCreate();

  const [showAllFields, setShowAllFields] = useState<boolean>(true);
  const [errorFields, setErrorFields] = useState<number[]>([]);

  const onFinish = (values: FormValues) => {
    mutateAsync({ data: [{ ...values, version: undefined }] });
  };

  const toggleView = () => {
    const formErrors = form
      .getFieldsError()
      .filter((field) => field.errors.length > 0 || field.warnings.length > 0)
      .map((value) => parseInt(value.name[1].toString(), 10));

    if (showAllFields) {
      setErrorFields(formErrors);
    }

    setShowAllFields(!showAllFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        experiment_id: locale.experiment_id,
        user: locale.user.email,
        version: completeVersion(locale.version),
        language: locale.language,
        content: locale.localePairs.map((pair) => ({
          key: pair.key,
          value: pair.value,
        })),
      }}
    >
      <Form.Item label="Experimento" name="experiment_id">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Usuário" name="user">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Versão" name="version">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Idioma" name="language">
        <Input disabled />
      </Form.Item>
      <Flex
        gap={16}
        justify="center"
        align="center"
        className="sticky top-4 z-10"
      >
        <Form.Item>
          <Button onClick={toggleView} danger={!showAllFields} type="primary">
            {showAllFields
              ? "Exibir Apenas Campos com Erro"
              : "Exibir Todos os Campos"}
          </Button>
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Salvar{" "}
            {`${handleLanguageName(locale.language)} - ${completeVersion(locale.version)}`}
          </Button>
        </Form.Item>
      </Flex>
      <Form.List name="content">
        {(fields, { add, remove }) => (
          <div>
            <Typography.Text>Conteúdo</Typography.Text>
            <Typography.Paragraph type="secondary">
              <InfoCircleOutlined /> Os itens em laranja são chaves que não
              estão presentes em todos os locales sendo exibidos no momento ou
              está sem tradução em ao menos um deles.
            </Typography.Paragraph>

            {fields
              .filter((value) =>
                showAllFields ? value : errorFields.includes(value.name)
              )
              .map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={[16, 24]}
                  justify="space-around"
                  align="middle"
                >
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        {
                          required: true,
                          message: "Preencha a chave",
                        },
                        {
                          warningOnly: true,
                          validator(_, value) {
                            if (
                              !locale.originalPairs.find(
                                (pair) => pair.key === value
                              )
                            ) {
                              return Promise.reject();
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Chave" rows={3} />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input.TextArea placeholder="Valor" rows={3} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item>
                      <Button
                        type="text"
                        size="large"
                        danger
                        disabled={fields.length <= 1}
                        onClick={() => remove(name)}
                        icon={<MinusCircleOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Adicionar chave e valor
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          Salvar{" "}
          {`${handleLanguageName(locale.language)} - ${completeVersion(locale.version)}`}
        </Button>
      </Form.Item>
    </Form>
  );
}
