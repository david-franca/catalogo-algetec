import { Button, Card, Result } from "antd";
import { useNavigate } from "@tanstack/react-router";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Card hoverable>
      <Result
        status={"error"}
        title="Erro"
        subTitle="Por favor, tente novamente. Se o problema persistir, contate o suporte."
        extra={
          <Button type="primary" onClick={() => navigate({ to: "/dashboard" })}>
            Voltar para o Dashboard
          </Button>
        }
      />
    </Card>
  );
}
