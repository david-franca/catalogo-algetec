import { Card, List, Space, Typography } from "antd";
import { nanoid } from "nanoid";

import { useDesigner } from "@/hooks/useDesigner";

import CardCorrelation from "./card-correlated";

interface CorrelationItemProps {
  type: "higly" | "medium" | "low";
}

export function CorrelationItem({ type }: CorrelationItemProps) {
  const { correlated_competences } = useDesigner();

  const handleTitle = (type: "higly" | "medium" | "low") => {
    switch (type) {
      case "higly":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
    }
  };

  const handleItems = (type: "higly" | "medium" | "low") => {
    if (correlated_competences) {
      switch (type) {
        case "higly":
          return correlated_competences.higly_correlated || [];
        case "medium":
          return correlated_competences.medium_correlated || [];
        case "low":
          return correlated_competences.low_correlated || [];
        default:
          return [];
      }
    }

    return [];
  };

  const handleDiscipline = (discipline: string) => {
    switch (discipline) {
      case "Ciências da Natureza e suas Tecnologias":
        return "ciencias-natureza";
      case "Ciências Humanas e suas Tecnologias":
        return "ciencias-humanas";
      case "Linguagens, Códigos e suas Tecnologias":
        return "linguagens";
      case "Matemática e suas Tecnologias":
        return "matematica";
      default:
        return "ciencias-natureza";
    }
  };

  const title = handleTitle(type);

  const items = handleItems(type);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Typography.Title level={4} className="text-indigo-800!">
        Correlação {title}
      </Typography.Title>
      <Card className="bg-indigo-50!">
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item key={nanoid()}>
              <Space direction="vertical" className="w-full">
                <Typography.Title level={5} className="text-indigo-800!">
                  Área do Conhecimento: {item.area_do_conhecimento}
                </Typography.Title>
                <List
                  dataSource={item.competencias}
                  renderItem={(i) => (
                    <List.Item key={nanoid()}>
                      <Space direction="vertical" className="w-full">
                        <Typography.Text strong className="text-indigo-800!">
                          {i.codigo_da_competencia} -{" "}
                          {i.descricao_da_competencia}
                        </Typography.Text>
                        <Typography.Text className="text-indigo-800!">
                          Categoria: {i.category_name}
                        </Typography.Text>
                        {i.habilidades && i.habilidades.length > 0
                          ? i.habilidades.map((object) => (
                              <CardCorrelation
                                key={nanoid()}
                                object={object}
                                discipline={handleDiscipline(
                                  item.area_do_conhecimento
                                )}
                              />
                            ))
                          : null}
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
