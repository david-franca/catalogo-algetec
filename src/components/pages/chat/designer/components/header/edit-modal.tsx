import { Form, Input, Modal, Radio } from "antd";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  area_of_knowledge: number;
}

export default function DesignerHeaderEditModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setHeader, area_of_knowledge, name, curricular_component } =
    useDesigner();

  const knowledge = useMemo(
    () => [
      { value: 1, label: "Ciências da Natureza e suas Tecnologias (Física)" },
      { value: 2, label: "Ciências da Natureza e suas Tecnologias (Química)" },
      { value: 3, label: "Ciências da Natureza e suas Tecnologias (Biologia)" },
      { value: 4, label: "Ciências Humanas e suas Tecnologias" },
      { value: 5, label: "Linguagens, Códigos e suas Tecnologias" },
      { value: 6, label: "Matemática e suas Tecnologias" },
    ],
    []
  );

  const handleCurricularComponent = (id: number) => {
    switch (id) {
      case 1:
        return "Física";
      case 2:
        return "Química";
      case 3:
        return "Biologia";
      default:
        return undefined;
    }
  };

  const handleAreaOfKnowledge = (id: number) => {
    switch (id) {
      case 1:
      case 2:
      case 3:
        return "Ciências da Natureza e suas Tecnologias";
      case 4:
        return "Ciências Humanas e suas Tecnologias";
      case 5:
        return "Linguagens, Códigos e suas Tecnologias";
      case 6:
        return "Matemática e suas Tecnologias";
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    const curricular_component = handleCurricularComponent(
      values.area_of_knowledge
    );
    const area_of_knowledge = handleAreaOfKnowledge(values.area_of_knowledge);
    setHeader({
      name: values.name,
      area_of_knowledge,
      curricular_component,
    });
    toast.success("Salvo com sucesso!");
    onClose();
  };

  useEffect(() => {
    if (curricular_component && area_of_knowledge) {
      const index = knowledge.findIndex((item) =>
        item.label.includes(curricular_component)
      );
      form.setFieldValue("area_of_knowledge", index + 1);
    } else if (area_of_knowledge) {
      const index = knowledge.findIndex((item) =>
        item.label.includes(area_of_knowledge)
      );
      form.setFieldValue("area_of_knowledge", index + 1);
    } else {
      form.setFieldValue("area_of_knowledge", undefined);
    }
  }, [area_of_knowledge, curricular_component, form, knowledge]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Editar Título e Área"
      onOk={onFinish}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name,
        }}
      >
        <Form.Item
          label="Título do experimento"
          name="name"
          rules={[{ required: true, message: "Por favor, digite um título" }]}
        >
          <Input placeholder="Digite um título ..." />
        </Form.Item>
        <Form.Item
          label="Área de conhecimento"
          name="area_of_knowledge"
          rules={[
            { required: true, message: "Por favor, selecione uma opção" },
          ]}
        >
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            options={knowledge}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
