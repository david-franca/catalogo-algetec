import { Button, Drawer, Form, Tabs } from "antd";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { DesignerKnowledgeObjects, useDesigner } from "@/hooks/useDesigner";
import { Focus } from "@/types/focus";

import { DesignerCompetenceTabItem } from "./tab-item";

import type { TabsProps } from "antd";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
  },
};

export default function DesignerKnowledgeSkillsEditModal({
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm<DesignerKnowledgeObjects["knowledge_objects"]>();
  const {
    setKnowledgeObjects,
    knowledge_objects,
    setFocus,
    focus: designerFocus,
  } = useDesigner();

  const onFinish = (values: DesignerKnowledgeObjects["knowledge_objects"]) => {
    setKnowledgeObjects({ knowledge_objects: values });
    const focus: Focus["knowledgeObjects"] = [];

    values?.higly_correlated?.forEach((correlated) => {
      correlated.categories.forEach((category) => {
        category.objects.forEach((object) => {
          if (object.on_focus) {
            focus.push({
              category_name: category.category_name,
              objects: category.objects,
            });
          }
        });
      });
    });
    values?.low_correlated?.forEach((correlated) => {
      correlated.categories.forEach((category) => {
        category.objects.forEach((object) => {
          if (object.on_focus) {
            focus.push({
              category_name: category.category_name,
              objects: category.objects,
            });
          }
        });
      });
    });
    values?.medium_correlated?.forEach((correlated) => {
      correlated.categories.forEach((category) => {
        category.objects.forEach((object) => {
          if (object.on_focus) {
            focus.push({
              category_name: category.category_name,
              objects: category.objects,
            });
          }
        });
      });
    });

    setFocus({ ...designerFocus, knowledgeObjects: focus });

    toast.success("Habilidade e competências atualizados com sucesso!");
    onClose();
  };

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "higly",
        label: "Correlação Alta",
        children: <DesignerCompetenceTabItem tabKey="higly" />,
      },
      {
        key: "medium",
        label: "Correlação Média",
        children: <DesignerCompetenceTabItem tabKey="medium" />,
      },
      {
        key: "low",
        label: "Correlação Baixa",
        children: <DesignerCompetenceTabItem tabKey="low" />,
      },
    ],
    []
  );

  useEffect(() => {
    form.setFieldsValue({
      higly_correlated: knowledge_objects?.higly_correlated || [],
      medium_correlated: knowledge_objects?.medium_correlated || [],
      low_correlated: knowledge_objects?.low_correlated || [],
    });
  }, [knowledge_objects, form]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="100%"
      title="Editar Objetos de Conhecimento Aplicáveis"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        layout="vertical"
      >
        <Tabs defaultActiveKey="higly" items={items} centered />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
