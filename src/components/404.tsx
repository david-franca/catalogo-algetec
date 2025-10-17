import { Button, Card, Result } from "antd";
import { useNavigate } from "@tanstack/react-router";

export function Error404Page() {
  const navigate = useNavigate();

  return (
    <Card hoverable>
      <Result
        status={"404"}
        title="404"
        subTitle="Desculpe, essa página não foi encontrada."
        extra={
          <Button type="primary" onClick={() => navigate({ to: "/dashboard" })}>
            Voltar para o Dashboard
          </Button>
        }
      />
    </Card>
  );
}
