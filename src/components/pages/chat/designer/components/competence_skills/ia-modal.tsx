import { Form, Input, List, Modal, Space, Typography } from "antd";
import { nanoid } from "nanoid";
import { useMemo } from "react";

import { BooleanField } from "@/components/fields";
import { useDesigner } from "@/hooks/useDesigner";
import { useEvaluateSkills } from "@/services/designer.service";

interface FormValues {
  instructions: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignerCompetenceSkillsIaModal({
  isOpen,
  onClose,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  const { mutateAsync, isPending } = useEvaluateSkills();

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
    knowledge_objectives,
    knowledge_objects,
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
      {
        title: "Objetivos de Aprendizagem",
        value: knowledge_objectives && knowledge_objectives?.length > 0,
      },
      {
        title: "Objetos de Conhecimento Aplicáveis",
        value: !!knowledge_objects,
      },
    ],
    [
      area_of_knowledge,
      conceitos,
      config.model,
      descricao_do_experimento,
      knowledge_objectives,
      knowledge_objects,
      name,
      necessary_materials,
      objetivo_geral,
      procedures,
      result_analysis,
      skills,
    ]
  );

  const disabled = useMemo(() => {
    return dataSource.some((item) => !item.value);
  }, [dataSource]);

  const onFinish = async () => {
    const { instructions } = await form.validateFields();
    await mutateAsync(instructions);
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
        loading: isPending,
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
