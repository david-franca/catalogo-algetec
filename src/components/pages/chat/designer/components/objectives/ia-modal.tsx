import { Form, Input, List, Modal, Space, Typography } from "antd";
import { nanoid } from "nanoid";
import { useMemo } from "react";

import { BooleanField } from "@/components/fields";
import { useDesigner } from "@/hooks/useDesigner";

interface FormValues {
  instructions: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignerObjectivesIaModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<FormValues>();

  const {
    area_of_knowledge,
    necessary_materials,
    procedures,
    config,
    name,
    result_analysis,
    descricao_do_experimento,
    objetivo_geral,
    conceitos,
    skills,
    setRequestResult,
  } = useDesigner();

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
      {
        title: "Descrição do Experimento e Objetivo Geral",
        value: descricao_do_experimento && objetivo_geral,
      },
      {
        title: "Conceitos",
        value: conceitos && conceitos?.length > 0,
      },
      {
        title: "Habilidades",
        value: skills && skills?.length > 0,
      },
    ],
    [
      area_of_knowledge,
      conceitos,
      config.model,
      descricao_do_experimento,
      name,
      necessary_materials,
      objetivo_geral,
      procedures,
      result_analysis,
      skills,
    ]
  );

  const disabled = useMemo(
    () => dataSource.some((item) => !item.value),
    [dataSource]
  );

  const onFinish = async () => {
    const { instructions } = await form.validateFields();
    setRequestResult({
      status: "ongoing",
      type: "learning-objectives",
      id: 0,
      instructions,
    });
    onClose();
  };

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
