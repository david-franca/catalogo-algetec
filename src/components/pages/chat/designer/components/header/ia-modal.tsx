import { useDesigner } from "@/hooks/useDesigner";
import { DesignerConfigGeneral } from "@/types/designer";
import { Button, Form, Input, Modal, Popconfirm, Select } from "antd";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignerHeaderIaModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<DesignerConfigGeneral>();

  const { config, setConfig, reset } = useDesigner();

  const iaOptions = [
    { value: "o3-mini", label: "GPT-o3-mini" },
    { value: "o1-mini", label: "GPT-o1-mini" },
  ];

  const onFinish = async () => {
    const values = await form.validateFields();
    setConfig({ config: values });
    onClose();
  };

  useEffect(() => {
    if (config) {
      form.setFieldsValue({
        instructions: config.instructions,
        model: config.model,
      });
    }
  }, [config, form]);

  return (
    <Modal
      title="Configurações"
      open={isOpen}
      onOk={onFinish}
      onCancel={onClose}
      okText="Salvar"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Modelo" name="model" rules={[{ required: true }]}>
          <Select
            options={iaOptions}
            allowClear
            placeholder="Selecione um modelo"
          />
        </Form.Item>
        <Form.Item label="Instruções gerais" name="instructions">
          <Input.TextArea
            rows={4}
            placeholder="Insira as instruções adicionais"
          />
        </Form.Item>
      </Form>
      <Popconfirm
        title="Tem certeza?"
        description="Reiniciar o experimento irá apagar todos os dados gerados?"
        onConfirm={reset}
        okText="Sim"
        cancelText="Cancelar"
      >
        <Button type="primary" danger>
          Apagar conteúdo
        </Button>
      </Popconfirm>
    </Modal>
  );
}
