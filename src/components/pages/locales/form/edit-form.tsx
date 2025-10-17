import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

import { useLocaleCreate, useLocalesShow } from "@/services/locale.service";
import { completeVersion } from "@/utils/completeVersion";
import { handleLanguageName } from "@/utils/handleLanguageName";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams, useSearch } from "@tanstack/react-router";

import { languageOptions } from "./locales";

interface FormValues {
  experiment_id: string;
  language: string;
  content: { key: string; value: string }[];
  version: string;
  user: string;
}

const DUPLICATE_KEY_ERROR_MESSAGE = "Chaves duplicadas não são permitidas.";

export function LocaleEditForm() {
  const [form] = Form.useForm();
  const { id } = useParams({ from: "/dashboard/locales/edit/$id" });
  const { language, version } = useSearch({
    from: "/dashboard/locales/edit/$id",
  });
  const {
    data: locales,
    isLoading,
    isFetching,
  } = useLocalesShow(id, language, version);
  const { mutateAsync, isPending } = useLocaleCreate();

  const onFinish = (values: FormValues) => {
    const language = languageOptions.find(
      (option) => option.label === values.language
    )?.value;

    if (!language) {
      toast.error("Idioma inválido");
      return;
    }

    mutateAsync({ data: [{ ...values, version: undefined, language }] })
      .then(() => {
        toast.success("Localização salva com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao salvar localização!");
      });
  };

  useEffect(() => {
    const setAndValidateForm = async () => {
      if (locales) {
        form.setFieldsValue({
          id: locales.id,
          experiment_id: locales.experiment_id,
          language: handleLanguageName(locales.language),
          content: locales.localePairs,
          version: completeVersion(locales.version),
          user: locales.user.name,
        });

        try {
          await form.validateFields();
        } catch (errorInfo) {
          console.log("Validation failed on load:", errorInfo);
        }
      }
    };

    setAndValidateForm();
  }, [locales, form]);

  return (
    <Card loading={isLoading || isFetching}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="version" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="user" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Experimento" name="experiment_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Idioma" name="language">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Usuário" name="user">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Versão (Ex: 1.0.0)" name="version">
          <Input />
        </Form.Item>
        <Form.List name="content">
          {(fields, { add, remove }) => (
            <div>
              <h2>Conteúdo</h2>

              {fields.map(({ key, name, ...restField }) => (
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
                        { required: true, message: "Preencha a chave" },
                        // Validador customizado para checar duplicidade
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const contentValues = getFieldValue(
                              "content"
                            ) as FormValues["content"];
                            if (!value || !contentValues) {
                              return Promise.resolve();
                            }
                            const duplicate = contentValues.filter(
                              (item, index) =>
                                item?.key === value && name !== index
                            );
                            if (duplicate.length > 0) {
                              return Promise.reject(
                                DUPLICATE_KEY_ERROR_MESSAGE
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.TextArea placeholder="Chave" rows={3} />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Preencha o valor" }]}
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
          <Button type="primary" htmlType="submit" loading={isPending}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
