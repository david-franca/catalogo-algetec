import { Button, Card, Form, Input, Select, Space } from "antd";
import { useMemo, useRef } from "react";
import { toast } from "sonner";

import { Tiptap } from "@/components/Tiptap";
import { useWikiCreate, useWikiSelect } from "@/services/wiki.service";
import { CreateCategoryForm } from "./create-category.form.";

interface ValuesFormData {
  title: string;
  description: string;
  content: string;
  documentation_category_id: string;
}

interface EditorRef {
  getEditorHtml: () => string;
}

export function WikiCreateForm() {
  const editorRef = useRef<EditorRef>(null);
  const { data: wikiOptions } = useWikiSelect();

  const { mutateAsync: createWiki, isPending: isCreating } = useWikiCreate();
  const [form] = Form.useForm<ValuesFormData>();

  const initialValues: ValuesFormData = useMemo(
    () => ({
      title: "",
      description: "",
      content: "",
      documentation_category_id: wikiOptions ? wikiOptions[0]?.value : "",
    }),
    [wikiOptions]
  );

  const onFinish = async (values: ValuesFormData) => {
    const html = editorRef.current?.getEditorHtml() || "";

    if (!html) {
      toast.error("Conteúdo é obrigatório");
      return;
    }
    const categoryId = values.documentation_category_id;

    await createWiki({
      ...values,
      content: html,
      documentation_category_id: Number(categoryId),
      archived: false,
    });
    form.resetFields();
    toast.success("Página criada com sucesso!");
  };

  return (
    <Card
      extra={
        <Space>
          <CreateCategoryForm />
          <Button
            htmlType="submit"
            type="primary"
            loading={isCreating}
            onClick={() => form.submit()}
          >
            Salvar
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ ...initialValues }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Título da Página"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "O título é obrigatório",
            },
            {
              min: 3,
              max: 100,
              message: "O título deve conter entre 3 e 100 caracteres",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "A descrição é obrigatória" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="documentation_category_id"
          label="Categoria"
          style={{ width: "50%" }}
          rules={[{ required: true, message: "Selecione uma categoria" }]}
        >
          <Select
            options={wikiOptions}
            allowClear
            placeholder="Selecione uma categoria"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="content" style={{ width: "100%" }} label="Conteúdo">
          <Tiptap ref={editorRef} />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button htmlType="submit" type="primary" loading={isCreating}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
