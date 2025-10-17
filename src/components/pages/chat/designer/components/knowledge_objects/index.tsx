import { Button, Card, Empty, Space, Spin, Typography } from "antd";
import { Edit2Icon, SparklesIcon, ZapIcon } from "lucide-react";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerRequest } from "@/services/designer.service";

import { CorrelationItem } from "./correlation";

const DesignerKnowledgeSkillsEditModal = lazy(() => import("./edit-modal"));
const DesignerKnowledgeSkillsIaModal = lazy(() => import("./ia-modal"));

export function DesignerKnowledgeObjects() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();

  const { isKnowledgeObjects, requestResult } = useDesigner();

  const { mutateAsync, isPending, failureCount } = useDesignerRequest();

  useEffect(() => {
    if (
      requestResult &&
      requestResult.type === "knowledge-objects" &&
      requestResult.status === "ongoing"
    ) {
      const knowledgeObjectsSession =
        document.getElementById("knowledge-objects");

      if (knowledgeObjectsSession) {
        knowledgeObjectsSession.scrollIntoView({ behavior: "smooth" });
      }

      toast.promise(
        mutateAsync({
          id: requestResult.id,
          type: requestResult.type,
        }),
        {
          loading: "Gerando Objetos de Conhecimento Aplicáveis...",
          success: "Objetos de Conhecimento Aplicáveis gerados com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }

            return "Error ao gerar objetos de conhecimento aplicáveis";
          },
        }
      );
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="knowledge-objects"
      title={
        <Space align="center">
          <ZapIcon className="h-4 w-4" />
          <Typography.Text strong>
            Objetos de Conhecimento Aplicáveis
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
          <Typography.Text>Gerando Objetos de Conhecimento...</Typography.Text>
          <Typography.Text>Tentativa {failureCount + 1}/10</Typography.Text>
        </div>
      ) : isKnowledgeObjects() ? (
        <div className="flex flex-col gap-2">
          <CorrelationItem type="higly" />
          <CorrelationItem type="medium" />
          <CorrelationItem type="low" />
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <DesignerKnowledgeSkillsEditModal {...editModal} />
      <DesignerKnowledgeSkillsIaModal {...iaModal} />
    </Card>
  );
}
