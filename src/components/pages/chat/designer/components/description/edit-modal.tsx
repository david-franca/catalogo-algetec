import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

import { useDesigner } from "@/hooks/useDesigner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  objetivo_geral: string;
  descricao_do_experimento: string;
}

export default function DesignerDescriptionModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();
  const { setDescription, descricao_do_experimento, objetivo_geral } =
    useDesigner();

  const onFinish = async () => {
    const values = await form.validateFields();
    setDescription(values);
    toast.success("Descrição atualizada com sucesso!");
    onClose();
  };

  useEffect(() => {
    if (descricao_do_experimento && objetivo_geral) {
      form.setFieldsValue({
        descricao_do_experimento,
        objetivo_geral,
      });
    }
  }, [descricao_do_experimento, form, objetivo_geral]);

  return (
    <Modal
      title="Editar Descrição do Experimento e Objetivo Geral"
      open={isOpen}
      onOk={onFinish}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Descrição"
          name="descricao_do_experimento"
          rules={[
            {
              required: true,
              message: "Por favor, insira a descrição do experimento.",
            },
          ]}
        >
          <Input.TextArea
            rows={8}
            placeholder="Insira a descrição do experimento e objetivo geral"
          />
        </Form.Item>
        <Form.Item
          label="Objetivo Geral"
          name="objetivo_geral"
          rules={[
            {
              required: true,
              message: "Por favor, insira o objetivo geral do experimento",
            },
          ]}
        >
          <Input.TextArea
            rows={8}
            placeholder="Insira o objetivo geral do experimento"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
