import { Button, Card, Empty, Space, Spin, Typography } from "antd";
import { Edit2Icon, GraduationCapIcon, SparklesIcon } from "lucide-react";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerRequest } from "@/services/designer.service";

import { CorrelationItem } from "./correlation";

const DesignerCompetenceSkillsEditModal = lazy(() => import("./edit-modal"));
const DesignerCompetenceSkillsIaModal = lazy(() => import("./ia-modal"));

export function DesignerCompetenceSkills() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();

  const { isCorrelatedCompetences, requestResult } = useDesigner();

  const { mutateAsync, isPending, failureCount } = useDesignerRequest();

  useEffect(() => {
    if (
      requestResult &&
      requestResult.type === "evaluate-skills" &&
      requestResult.status === "ongoing"
    ) {
      const descriptionSession = document.getElementById("evaluate-skills");
      if (descriptionSession) {
        descriptionSession.scrollIntoView({ behavior: "smooth" });
      }
      toast.promise(
        mutateAsync({ id: requestResult.id, type: requestResult.type }),
        {
          loading: "Gerando Habilidades e Competências...",
          success: "Habilidades e Competências geradas com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }
            return "Erro ao gerar habilidades e competências";
          },
        }
      );
    }
  }, [mutateAsync, requestResult]);

  // useEffect(() => {
  //   if (
  //     requestResult &&
  //     requestResult.type === "questions" &&
  //     requestResult.status === "ongoing"
  //   ) {
  //     toast.promise(skillsQuestions(), {
  //       loading: "Gerando perguntas...",
  //       success: "Perguntas geradas com sucesso!",
  //       error(data) {
  //         if (isZodErrorLike(data)) {
  //           const zodError = fromZodError(data, {
  //             includePath: false,
  //             prefix: null,
  //           });
  //           return zodError.toString();
  //         }
  //         return "Erro ao gerar perguntas";
  //       },
  //     });
  //   }
  // }, [requestResult, skillsQuestions]);

  return (
    <Card
      id="evaluate-skills"
      title={
        <Space align="center">
          <GraduationCapIcon className="h-4 w-4" />
          <Typography.Text strong>Habilidades e Competências</Typography.Text>
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
          <Typography.Text>
            Gerando Habilidades e Competências...
          </Typography.Text>
          <Typography.Text>
            Tentativa {failureCount + 1}/{10}
          </Typography.Text>
        </div>
      ) : isCorrelatedCompetences() ? (
        <div className="flex flex-col gap-2">
          <CorrelationItem type="higly" />
          <CorrelationItem type="medium" />
          <CorrelationItem type="low" />
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <DesignerCompetenceSkillsEditModal {...editModal} />
      <DesignerCompetenceSkillsIaModal {...iaModal} />
    </Card>
  );
}
