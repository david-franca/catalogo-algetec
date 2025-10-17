import { Button, Card, Empty, List, Space, Spin, Typography } from "antd";
import {
  ChartLineIcon,
  CircleHelpIcon,
  Edit2Icon,
  SparklesIcon,
} from "lucide-react";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerRequest } from "@/services/designer.service";

const DesignerResultAnalysisModal = lazy(() => import("./edit-modal"));
const DesignerResultAnalysisIaModal = lazy(() => import("./ia-modal"));

export function DesignerResultAnalysis() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();
  const { result_analysis, requestResult } = useDesigner();

  const { mutateAsync, isPending, failureCount } = useDesignerRequest();

  useEffect(() => {
    if (
      requestResult &&
      requestResult.type === "review-question" &&
      requestResult.status === "ongoing"
    ) {
      const resultAnalysisSession = document.getElementById("review-question");

      if (resultAnalysisSession) {
        resultAnalysisSession.scrollIntoView({ behavior: "smooth" });
      }
      toast.promise(
        mutateAsync({
          id: requestResult.id,
          type: requestResult.type,
        }),
        {
          loading: "Gerando Análises de Resultados...",
          success: "Análises de Resultados geradas com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }
            return "Erro ao gerar análises de resultados";
          },
        }
      );
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="review-question"
      title={
        <Space align="center">
          <ChartLineIcon className="h-4 w-4" />
          <Typography.Text strong>Análise dos Resultados</Typography.Text>
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
          <Typography.Text>Gerando Análises de Resultados...</Typography.Text>
          <Typography.Text>Tentativa {failureCount + 1}/10</Typography.Text>
        </div>
      ) : result_analysis && result_analysis.length > 0 ? (
        <List
          dataSource={result_analysis}
          renderItem={(item) => (
            <List.Item>
              <Space align="start">
                <CircleHelpIcon className="h-4 w-4 text-red-600 mt-1" />
                <Typography.Text>{item.question}</Typography.Text>
              </Space>
            </List.Item>
          )}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <DesignerResultAnalysisModal {...editModal} />
      <DesignerResultAnalysisIaModal {...iaModal} />
    </Card>
  );
}
