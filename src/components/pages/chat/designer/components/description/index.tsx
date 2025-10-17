import { Button, Card, Space, Spin, Typography } from "antd";
import { Edit2Icon, FlaskConicalIcon, SparklesIcon } from "lucide-react";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerDescription } from "@/services/designer.service";

const DesignerDescriptionModal = lazy(() => import("./edit-modal"));
const DesignerDescriptionIaModal = lazy(() => import("./ia-modal"));

export function DesignerDescription() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();

  const { mutateAsync, isPending } = useDesignerDescription();

  const { descricao_do_experimento, objetivo_geral, requestResult } =
    useDesigner();

  useEffect(() => {
    if (requestResult) {
      if (
        requestResult.type === "description" &&
        requestResult.status === "ongoing"
      ) {
        const descriptionSession = document.getElementById("description");
        if (descriptionSession) {
          descriptionSession.scrollIntoView({ behavior: "smooth" });
        }

        toast.promise(mutateAsync(requestResult.instructions), {
          loading: "Gerando Descrição e Objetivo...",
          success: "Descrição e Objetivo gerados com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }

            return "Error ao gerar descrição e objetivo";
          },
        });
      }
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="description"
      title={
        <Space align="center">
          <FlaskConicalIcon className="h-4 w-4" />
          <Typography.Text strong>
            Descrição do Experimento e Objetivo Geral
          </Typography.Text>
        </Space>
      }
      extra={
        <Space>
          <Button
            icon={<SparklesIcon className="h-4 w-4" />}
            type="text"
            shape="circle"
            onClick={iaModal.onOpen}
          />
          <Button
            icon={<Edit2Icon className="h-4 w-4" />}
            type="text"
            shape="circle"
            onClick={editModal.onOpen}
          />
        </Space>
      }
    >
      {isPending ? (
        <div className="flex flex-col gap-2 items-center">
          <Spin size="large" />
          <Typography.Text>Gerando Descrição e Objetivo...</Typography.Text>
        </div>
      ) : (
        <Space direction="vertical">
          <Typography.Text strong>Descrição:</Typography.Text>
          <Typography.Paragraph>
            {descricao_do_experimento}
          </Typography.Paragraph>
          <Typography.Text strong>Objetivo:</Typography.Text>
          <Typography.Paragraph>{objetivo_geral}</Typography.Paragraph>
        </Space>
      )}
      <DesignerDescriptionModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />
      <DesignerDescriptionIaModal
        isOpen={iaModal.isOpen}
        onClose={iaModal.onClose}
      />
    </Card>
  );
}
