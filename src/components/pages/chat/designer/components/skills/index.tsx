import { Button, Card, Col, Empty, Row, Space, Spin, Typography } from "antd";
import { Edit2Icon, MessageCircleIcon, SparklesIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { lazy, useEffect } from "react";
import _ from "lodash";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerSkills } from "@/services/designer.service";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

const DesignerSkillsEditModal = lazy(() => import("./edit-modal"));
const DesignerSkillsIaModal = lazy(() => import("./ia-modal"));

export function DesignerSkills() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();
  const { skills, requestResult } = useDesigner();

  const { mutateAsync, isPending } = useDesignerSkills();

  useEffect(() => {
    if (requestResult) {
      if (
        requestResult.type === "skills" &&
        requestResult.status === "ongoing"
      ) {
        const descriptionSession = document.getElementById("skills");
        if (descriptionSession) {
          descriptionSession.scrollIntoView({ behavior: "smooth" });
        }

        toast.promise(mutateAsync(requestResult.instructions), {
          loading: "Gerando Habilidades...",
          success: "Habilidades geradas com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }

            return "Error ao gerar habilidades";
          },
        });
      }
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="skills"
      title={
        <Space align="center">
          <MessageCircleIcon className="h-4 w-4" />
          <Typography.Text strong>Habilidades</Typography.Text>
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
          <Typography.Text>Gerando Habilidades...</Typography.Text>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <Col span={12} key={nanoid()}>
                <Card hoverable className="bg-teal-50! h-full">
                  <Space direction="vertical">
                    <Typography.Text strong className="text-teal-800! text-lg!">
                      Habilidade {index + 1} — {skill.nome}
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Descrição:
                      </Typography.Text>
                      {skill.descricao}
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Tipo:
                      </Typography.Text>
                      {_.startCase(skill.tipo.toLowerCase())}
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

      <DesignerSkillsEditModal {...editModal} />
      <DesignerSkillsIaModal {...iaModal} />
    </Card>
  );
}
