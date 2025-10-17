import { Form, Input, List, Modal, Space, Typography } from "antd";
import { nanoid } from "nanoid";
import { useMemo } from "react";

import { BooleanField } from "@/components/fields";
import { useDesigner } from "@/hooks/useDesigner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  instructions: string;
}

export default function DesignerDescriptionIaModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();

  const {
    area_of_knowledge,
    necessary_materials,
    procedures,
    config,
    name,
    result_analysis,
    setRequestResult,
  } = useDesigner();

  const onFinish = async () => {
    const { instructions } = await form.validateFields();
    setRequestResult({
      status: "ongoing",
      type: "description",
      id: 0,
      instructions,
    });
    onClose();
  };

  const dataSource = useMemo(
    () => [
      { title: "Modelo de IA", value: !!config.model },
      { title: "Nome", value: !!name },
      { title: "Área de Conhecimento", value: !!area_of_knowledge },
      {
        title: "Materiais Necessários",
        value: necessary_materials && necessary_materials?.length > 0,
      },
      { title: "Procedimentos", value: procedures && procedures?.length > 0 },
      {
        title: "Análise do Resultado",
        value: result_analysis && result_analysis?.length > 0,
      },
    ],
    [
      area_of_knowledge,
      config.model,
      name,
      necessary_materials,
      procedures,
      result_analysis,
    ]
  );

  const disabled = dataSource.some((item) => !item.value);

  return (
    <Modal
      title="Gerar Conteúdo"
      open={isOpen}
      onOk={onFinish}
      onCancel={onClose}
      okText="Gerar"
      okButtonProps={{
        disabled,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Instruções adicionais" name="instructions">
          <Input.TextArea
            rows={8}
            placeholder="Insira as instruções adicionais"
          />
        </Form.Item>
      </Form>
      <List
        size="small"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item key={nanoid()} className="p-0!">
            <Space size="small">
              <BooleanField value={item.value} className="w-fit" />
              <Typography.Text strong={!item.value}>
                {item.title}
              </Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </Modal>
  );
}
