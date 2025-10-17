import { Button, Drawer, Form, Tabs } from "antd";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { CorrelatedCompetences, useDesigner } from "@/hooks/useDesigner";
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

export default function DesignerCompetenceSkillsEditModal({
  isOpen,
  onClose,
}: Props) {
  const [form] =
    Form.useForm<CorrelatedCompetences["correlated_competences"]>();
  const {
    setCorrelatedCompetences,
    correlated_competences,
    setFocus,
    focus: designerFocus,
  } = useDesigner();

  const onFinish = (
    values: CorrelatedCompetences["correlated_competences"]
  ) => {
    setCorrelatedCompetences({ correlated_competences: values });
    const focus: Focus["competencySkills"] = [];
    values?.higly_correlated?.forEach((item) => {
      item.competencias.forEach((competencia) => {
        competencia.habilidades.forEach((habilidade) => {
          if (habilidade.on_focus) {
            focus.push({
              area_do_conhecimento: item.area_do_conhecimento,
              codigo_da_competencia: competencia.codigo_da_competencia,
              codigo_da_habilidade: habilidade.codigo_da_habilidade,
              descricao_da_competencia: competencia.descricao_da_competencia,
              descricao_da_habilidade: habilidade.descricao_da_habilidade,
              exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
            });
          }
        });
      });
    });
    values?.medium_correlated?.forEach((item) => {
      item.competencias.forEach((competencia) => {
        competencia.habilidades.forEach((habilidade) => {
          if (habilidade.on_focus) {
            focus.push({
              area_do_conhecimento: item.area_do_conhecimento,
              codigo_da_competencia: competencia.codigo_da_competencia,
              codigo_da_habilidade: habilidade.codigo_da_habilidade,
              descricao_da_competencia: competencia.descricao_da_competencia,
              descricao_da_habilidade: habilidade.descricao_da_habilidade,
              exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
            });
          }
        });
      });
    });
    values?.low_correlated?.forEach((item) => {
      item.competencias.forEach((competencia) => {
        competencia.habilidades.forEach((habilidade) => {
          if (habilidade.on_focus) {
            focus.push({
              area_do_conhecimento: item.area_do_conhecimento,
              codigo_da_competencia: competencia.codigo_da_competencia,
              codigo_da_habilidade: habilidade.codigo_da_habilidade,
              descricao_da_competencia: competencia.descricao_da_competencia,
              descricao_da_habilidade: habilidade.descricao_da_habilidade,
              exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
            });
          }
        });
      });
    });
    setFocus({ ...designerFocus, competencySkills: focus });
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
      higly_correlated: correlated_competences?.higly_correlated || [],
      medium_correlated: correlated_competences?.medium_correlated || [],
      low_correlated: correlated_competences?.low_correlated || [],
    });
  }, [correlated_competences, form]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="100%"
      title="Editar Habilidades e Competências"
    >
      <Form
        form={form}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        // initialValues={{ ...correlated_competences }}
        layout="vertical"
      >
        <Tabs defaultActiveKey="hight" items={items} centered />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
