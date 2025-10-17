import { Badge, Button, Card, Pagination, Space, Typography } from "antd";
import { useState } from "react";

import { useGetEnemQuestions } from "@/services/designer.service";
import { nanoid } from "nanoid";
import "./style.css";
import EnemQuestion from "./enem-question";

interface CorrelationItemProps {
  name: string;
  isFocus?: boolean;
}

export default function CardCorrelation({
  name,
  isFocus,
}: CorrelationItemProps) {
  const [enabled, setEnabled] = useState(false);
  const { data, isFetching } = useGetEnemQuestions({
    params: { object: name },
    enabled,
  });

  const [page, setPage] = useState(1);

  return (
    <Badge.Ribbon
      text={isFocus ? "Objeto em foco" : ""}
      color={isFocus ? "green" : "rgba(255, 255, 255, 0.1)"}
      placement="start"
    >
      <Card
        hoverable
        styles={{
          body: {
            paddingTop: "1.8rem",
          },
        }}
      >
        <Space direction="vertical">
          <Typography.Text strong>{name}</Typography.Text>
          <Button
            type="primary"
            onClick={() => setEnabled(!enabled)}
            loading={isFetching}
          >
            {enabled && !isFetching
              ? "Fechar questões"
              : "Ver questões do ENEM"}
          </Button>
          {enabled && !isFetching && data && data.length > 0 ? (
            <div>
              <Pagination
                total={data.length}
                pageSize={1}
                onChange={(page) => {
                  setPage(page);
                }}
                style={{
                  marginBottom: 8,
                }}
                align="center"
              />
              <EnemQuestion question={data[page - 1]} key={nanoid()} />
            </div>
          ) : null}
        </Space>
      </Card>
    </Badge.Ribbon>
  );
}
