import { Button, Card, Form, Input, Select, Space } from "antd";
import { useMemo, useRef } from "react";
import { toast } from "sonner";

import { Tiptap } from "@/components/Tiptap";
import {
  useWikiSelect,
  useWikiShow,
  useWikiUpdate,
} from "@/services/wiki.service";

import { CreateCategoryForm } from "./create-category.form.";

interface WikiEditFormProps {
  id: string;
}

interface EditorRef {
  getEditorHtml: () => string;
}

interface DataSource {
  title: string;
  description: string;
  content: string;
  documentation_category_id: string[];
}

export function WikiEditForm({ id }: WikiEditFormProps) {
  const [form] = Form.useForm();
  const editorRef = useRef<EditorRef>(null);

  const { data: wikiOptions } = useWikiSelect();
  const { data: wikiPages, isLoading } = useWikiShow(id);
  const { mutateAsync: updatePage, isPending: isUpdating } = useWikiUpdate(id);

  const initialValues: DataSource = useMemo(
    () => ({
      title: wikiPages?.[0].title || "",
      description: wikiPages?.[0].description || "",
      content: wikiPages?.[0].content || "",
      documentation_category_id: wikiPages
        ? [wikiPages?.[0].documentation_category_id.toString()]
        : [],
    }),
    [wikiPages]
  );

  const onFinish = async (values: DataSource) => {
    const categoryId = values.documentation_category_id[0];
    const html = editorRef.current?.getEditorHtml() || "";

    if (!html) {
      toast.error("Conteúdo é obrigatório");
      return;
    }

    await updatePage({
      data: {
        ...values,
        content: html,
        documentation_category_id: parseInt(categoryId, 10),
      },
    });

    toast.success("Página atualizada com sucesso!");
  };
  return (
    <Card
      loading={isLoading}
      extra={
        <Space>
          <CreateCategoryForm />
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
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
          />
        </Form.Item>
        <Form.Item name="content" label="Conteúdo" style={{ width: "100%" }}>
          <Tiptap ref={editorRef} />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
