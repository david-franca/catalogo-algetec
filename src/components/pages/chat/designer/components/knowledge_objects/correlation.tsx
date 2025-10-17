import { Card, List, Space, Typography } from "antd";
import { nanoid } from "nanoid";
import { Fragment } from "react";

import { useDesigner } from "@/hooks/useDesigner";

import CardCorrelation from "./card-correlation";

interface CorrelationItemProps {
  type: "higly" | "medium" | "low";
}

export function CorrelationItem({ type }: CorrelationItemProps) {
  const { knowledge_objects } = useDesigner();

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
    if (knowledge_objects) {
      switch (type) {
        case "higly":
          return knowledge_objects.higly_correlated || [];
        case "medium":
          return knowledge_objects.medium_correlated || [];
        case "low":
          return knowledge_objects.low_correlated || [];
        default:
          return [];
      }
    }

    return [];
  };

  const title = handleTitle(type);

  const items = handleItems(type);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Typography.Title level={4} className="text-amber-800!">
        Correlação {title}
      </Typography.Title>
      <Card className="bg-amber-50!">
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item key={nanoid()}>
              <Space direction="vertical" className="w-full">
                <Typography.Title level={5} className="text-amber-800!">
                  Área do Conhecimento: {item.competency_area_name}
                </Typography.Title>
                <Typography.Text className="text-amber-800! text-sm!">
                  Componente Curricular: {item.curriculum_component}
                </Typography.Text>
                {item.categories && item.categories.length > 0
                  ? item.categories.map((object) => (
                      <Fragment key={nanoid()}>
                        <Typography.Text strong className="text-amber-800!">
                          Categoria: {object.category_name}
                        </Typography.Text>
                        {object.objects.map((o) => (
                          <CardCorrelation
                            name={o.object_name}
                            isFocus={o.on_focus}
                            key={nanoid()}
                          />
                        ))}
                      </Fragment>
                    ))
                  : null}
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
