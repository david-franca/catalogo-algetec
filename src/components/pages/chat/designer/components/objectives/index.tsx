import { Button, Card, Col, Empty, Row, Space, Spin, Typography } from "antd";
import { Edit2Icon, SparklesIcon, TargetIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useLearningObjectives } from "@/services/designer.service";

const DesignerObjectivesEditModal = lazy(() => import("./edit-modal"));
const DesignerObjectivesIaModal = lazy(() => import("./ia-modal"));

export function DesignerObjectives() {
  const editoModal = useDisclosure();
  const iaModal = useDisclosure();

  const { knowledge_objectives, requestResult } = useDesigner();

  const { mutateAsync, isPending } = useLearningObjectives();

  useEffect(() => {
    if (requestResult) {
      if (
        requestResult.type === "learning-objectives" &&
        requestResult.status === "ongoing"
      ) {
        const descriptionSession = document.getElementById(
          "learning-objectives"
        );
        if (descriptionSession) {
          descriptionSession.scrollIntoView({ behavior: "smooth" });
        }

        toast.promise(mutateAsync(requestResult.instructions), {
          loading: "Gerando Objetivos de Aprendizagem...",
          success: "Objetivos de Aprendizagem gerados com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }

            return "Error ao gerar objetivos de aprendizagem";
          },
        });
      }
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="learning-objectives"
      title={
        <Space align="center">
          <TargetIcon className="h-4 w-4" />
          <Typography.Text strong>Objetivos de Aprendizagem</Typography.Text>
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
            onClick={editoModal.onOpen}
          />
        </Space>
      }
    >
      {isPending ? (
        <div className="flex flex-col gap-2 items-center">
          <Spin size="large" />
          <Typography.Text>
            Gerando Objetivos de Aprendizagem...
          </Typography.Text>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {knowledge_objectives && knowledge_objectives.length > 0 ? (
            knowledge_objectives.map((objective, index) => (
              <Col span={12} key={nanoid()}>
                <Card className="bg-sky-50! h-full" hoverable>
                  <Space direction="vertical">
                    <Typography.Title
                      level={5}
                      className="text-sky-800! text-lg!"
                    >
                      Objetivo {index + 1} - {objective.tipo}
                    </Typography.Title>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Descrição:
                      </Typography.Text>
                      {objective.descricao}
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Relação com a Prática:
                      </Typography.Text>
                      {objective.relacao_com_a_pratica}
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Procedimentos Relacionados:
                      </Typography.Text>
                      {objective.procedimentos_relacionados.join(", ")}
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Avaliação do Objetivo:
                      </Typography.Text>
                      {objective.avaliacao_do_objetivo}
                    </Typography.Text>
                  </Space>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      )}
      <DesignerObjectivesEditModal {...editoModal} />
      <DesignerObjectivesIaModal {...iaModal} />
    </Card>
  );
}
