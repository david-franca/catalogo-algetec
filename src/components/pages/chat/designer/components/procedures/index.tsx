import {
  Avatar,
  Button,
  Card,
  Empty,
  Space,
  Spin,
  Timeline,
  Typography,
} from "antd";
import { ChartNoAxesGanttIcon, Edit2Icon, SparklesIcon } from "lucide-react";
import { lazy, useEffect } from "react";
import { toast } from "sonner";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerRequest } from "@/services/designer.service";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

const DesignerProceduresEditModal = lazy(() => import("./edit-modal"));
const DesignerProceduresIaModal = lazy(() => import("./ia-modal"));

export function DesignerProcedures() {
  const editModal = useDisclosure();

  const iaModal = useDisclosure();

  const { procedures, requestResult } = useDesigner();

  const { isPending, mutateAsync, failureCount } = useDesignerRequest();

  useEffect(() => {
    if (
      requestResult &&
      requestResult.type === "review-script" &&
      requestResult.status === "ongoing"
    ) {
      const proceduresSession = document.getElementById("review-script");

      if (proceduresSession) {
        proceduresSession.scrollIntoView({ behavior: "smooth" });
      }
      toast.promise(
        mutateAsync({
          id: requestResult.id,
          type: requestResult.type,
        }),
        {
          loading: "Gerando Procedimentos...",
          success: "Procedimentos gerados com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }
            return "Erro ao gerar procedimentos";
          },
        }
      );
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="review-script"
      title={
        <Space align="center">
          <ChartNoAxesGanttIcon className="h-4 w-4" />
          <Typography.Text strong>Procedimentos</Typography.Text>
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
          <Typography.Text>Gerando Procedimentos...</Typography.Text>
          <Typography.Text>Tentativa {failureCount + 1}/10</Typography.Text>
        </div>
      ) : procedures && procedures.length > 0 ? (
        <Timeline
          items={procedures?.map((procedure, index) => ({
            children: (
              <Card className="bg-blue-50!" hoverable>
                <Typography.Title level={5} className="text-blue-800!">
                  {procedure.procedure.toUpperCase()}
                </Typography.Title>
                <Typography.Paragraph className="text-neutral-950!">
                  {procedure.intermediate_text}
                </Typography.Paragraph>
                {procedure.cognitive_hint && (
                  <Typography.Text className="text-gray-600!">
                    <Typography.Text strong className="mr-2 text-blue-800!">
                      Dica cognitiva:
                    </Typography.Text>
                    {procedure.cognitive_hint}
                  </Typography.Text>
                )}
              </Card>
            ),
            dot: (
              <Avatar
                shape="circle"
                size="small"
                icon={
                  <Typography.Text strong className="text-blue-800!">
                    {index + 1}
                  </Typography.Text>
                }
                className="bg-blue-100! text-blue-800!"
              />
            ),
          }))}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <DesignerProceduresEditModal {...editModal} />

      <DesignerProceduresIaModal {...iaModal} />
    </Card>
  );
}
