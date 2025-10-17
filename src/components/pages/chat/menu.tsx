import { Button, Card, Space } from "antd";

import { useLocation, useNavigate } from "@tanstack/react-router";

export function ChatMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Card type="inner" className="w-2xs! h-full" title="Opções Automáticas">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button
          size="large"
          block
          onClick={() => navigate({ to: "/dashboard/chat" })}
          type={pathname === "/dashboard/chat" ? "primary" : "default"}
          className="overflow-hidden truncate w-2 block"
        >
          Chat
        </Button>
        <Button
          size="large"
          block
          onClick={() => navigate({ to: "/dashboard/chat/analyze-scripts" })}
          type={
            pathname === "/dashboard/chat/analyze-scripts"
              ? "primary"
              : "default"
          }
          className="overflow-hidden truncate w-2 block"
        >
          Analisar Roteiros (ENEM)
        </Button>
        <Button
          size="large"
          block
          onClick={() => navigate({ to: "/dashboard/chat/designer" })}
          type={pathname === "/dashboard/chat/designer" ? "primary" : "default"}
          className="overflow-hidden truncate w-2 block"
        >
          Designer de Documentos
        </Button>
      </Space>
    </Card>
  );
}
