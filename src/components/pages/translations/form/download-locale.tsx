import { Button, Card, Form, Input, Select } from "antd";

import { useTranslationCSV } from "@/services/translation.service";

import { languageOptions } from "../../locales/form/locales";

interface FormProps {
  id: string;
  language: string;
}

export function DownloadLocaleForm() {
  const { mutate, isPending } = useTranslationCSV();

  const [form] = Form.useForm<FormProps>();
  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          language: "all",
        }}
        onFinish={mutate}
      >
        <Form.Item
          name="id"
          label="ID"
          required
          rules={[
            {
              required: true,
              message: "O ID é obrigatório.",
            },
          ]}
        >
          <Input placeholder="Digite um ID" />
        </Form.Item>
        <Form.Item
          name="language"
          label="Selecione o idioma"
          required
          rules={[
            {
              required: true,
              message: "O idioma é obrigatório.",
            },
          ]}
        >
          <Select
            placeholder="Selecione o idioma"
            showSearch
            optionFilterProp="label"
            options={[
              {
                label: "Todos",
                value: "all",
              },
              ...languageOptions,
            ]}
          />
        </Form.Item>
        <Form.Item className="w-full flex justify-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Baixar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
