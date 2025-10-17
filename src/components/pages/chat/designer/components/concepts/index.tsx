import { Button, Card, Col, Empty, Row, Space, Spin, Typography } from "antd";
import _ from "lodash";
import { BookmarkIcon, Edit2Icon, SparklesIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { lazy, useEffect } from "react";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { BooleanField } from "@/components/fields";
import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";
import { useDesignerConcepts } from "@/services/designer.service";

const DesignerConceptsEditModal = lazy(() => import("./edit-modal"));
const DesignerConceptsIaModal = lazy(() => import("./ia-modal"));

export function DesignerConcepts() {
  const editModal = useDisclosure();
  const iaModal = useDisclosure();

  const { conceitos, requestResult } = useDesigner();

  const { mutateAsync, isPending } = useDesignerConcepts();

  useEffect(() => {
    if (requestResult) {
      if (
        requestResult.type === "concepts" &&
        requestResult.status === "ongoing"
      ) {
        const descriptionSession = document.getElementById("concepts");
        if (descriptionSession) {
          descriptionSession.scrollIntoView({ behavior: "smooth" });
        }

        toast.promise(mutateAsync(requestResult.instructions), {
          loading: "Gerando Conceitos...",
          success: "Conceitos gerados com sucesso!",
          error(data) {
            if (isZodErrorLike(data)) {
              const zodError = fromZodError(data, {
                includePath: false,
                prefix: null,
              });
              return zodError.toString();
            }

            return "Error ao gerar conceitos";
          },
        });
      }
    }
  }, [mutateAsync, requestResult]);

  return (
    <Card
      id="concepts"
      title={
        <Space align="center">
          <BookmarkIcon className="h-4 w-4" />
          <Typography.Text strong>Conceitos</Typography.Text>
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
          <Typography.Text>Gerando Conceitos...</Typography.Text>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {conceitos && conceitos.length > 0 ? (
            conceitos.map((conceito) => (
              <Col span={12} key={nanoid()}>
                <Card hoverable className="bg-amber-50! h-full">
                  <Space direction="vertical">
                    <Typography.Text
                      strong
                      className="text-amber-800! text-lg!"
                    >
                      {conceito.nome} (
                      {_.startCase(conceito.tipo.toLowerCase())})
                    </Typography.Text>
                    <Typography.Text className="text-black!">
                      <Typography.Text strong className="mr-2 text-black!">
                        Descrição:
                      </Typography.Text>
                      {conceito.descricao}
                    </Typography.Text>
                    <Typography.Text>
                      <Typography.Text strong className="mr-2 text-black!">
                        Já Abordado?
                      </Typography.Text>
                      <BooleanField value={conceito.ja_abordado} />
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

      <DesignerConceptsEditModal {...editModal} />

      <DesignerConceptsIaModal {...iaModal} />
    </Card>
  );
}
