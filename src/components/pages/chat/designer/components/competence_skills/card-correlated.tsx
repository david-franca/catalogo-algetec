import { Badge, Button, Card, Pagination, Space, Typography } from "antd";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import Markdown from "react-markdown";
import { SkillHabilidade } from "@/types/designer";

import EnemQuestion from "./enem-question";
import { useGetEnemQuestions } from "@/services/designer.service";

interface EnemQuestionProps {
  object: SkillHabilidade;
  discipline: string;
}

export default function CardCorrelation({
  object,
  discipline,
}: EnemQuestionProps) {
  // const [id, setId] = useState<string | null>();
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const { data, isFetching } = useGetEnemQuestions({
    params: {
      skill: object.codigo_da_habilidade,
      discipline,
    },
    enabled,
  });

  // const { questions } = useDesigner();

  // const question = useMemo(() => {
  //   if (questions && id && questions.questions) {
  //     const skillBlock = questions.questions.root[id];

  //     const questoesDetalhes = skillBlock.questoes_detalhes || [];
  //     const questoesCompletas = skillBlock.questoes_completas || [];

  //     const sortedDetalhes = [...questoesDetalhes].sort(
  //       (a, b) => a.relative_difficulty - b.relative_difficulty
  //     );

  //     const sortedQuestoes = sortedDetalhes
  //       .map((detail) => {
  //         const q = questoesCompletas.find((qq) => qq.index === detail.index);
  //         return { ...q, relative_difficulty: detail.relative_difficulty };
  //       })
  //       .filter((q) => q) as QuestionComplete[];

  //     return sortedQuestoes.sort(
  //       (a, b) => parseFloat(a.difficulty) - parseFloat(b.difficulty)
  //     );
  //   }
  // }, [id, questions]);

  const exemplos = useMemo(
    () =>
      object.exemplos_de_aplicacao
        ? "Exemplos: " + object.exemplos_de_aplicacao.join(", ")
        : undefined,
    [object.exemplos_de_aplicacao]
  );

  return (
    <Badge.Ribbon
      text={object.on_focus ? "Habilidade em foco" : ""}
      color={object.on_focus ? "green" : "rgba(255, 255, 255, 0.1)"}
      placement="start"
    >
      <Card
        hoverable
        styles={{
          body: {
            paddingTop: "2rem",
          },
        }}
      >
        <Space direction="vertical">
          <Typography.Text strong>
            {object.codigo_da_habilidade} — {object.descricao_da_habilidade}
          </Typography.Text>
          {exemplos && <Markdown>{exemplos}</Markdown>}
          <Button
            type="primary"
            onClick={() => setEnabled(!enabled)}
            loading={isFetching}
          >
            {enabled && !isFetching
              ? "Fechar questões"
              : "Ver questões do ENEM"}
          </Button>
          {enabled && !isFetching && data && data.length > 0 ? (
            <div>
              <Pagination
                total={data.length}
                pageSize={1}
                onChange={(page) => {
                  setPage(page);
                }}
                style={{
                  marginBottom: 8,
                }}
                align="center"
              />
              <EnemQuestion question={data[page - 1]} key={nanoid()} />
            </div>
          ) : null}
        </Space>
      </Card>
    </Badge.Ribbon>
  );
}
