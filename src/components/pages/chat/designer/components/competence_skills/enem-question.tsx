import { Button, Card, Image, List, Progress, Typography } from "antd";

import { useMemo } from "react";
import { useDisclosure } from "@/hooks";
import Markdown from "react-markdown";
import { Question } from "@/types/question";

interface EnemQuestionProps {
  question: Question;
}

export default function EnemQuestion({ question }: EnemQuestionProps) {
  const alternatives = useMemo(() => question?.alternatives, [question]);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      classNames={{
        body: "space-y-4 mt-2",
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button onClick={onToggle}>
            {isOpen ? "Esconder resposta" : "Ver resposta"}
          </Button>
        </div>
      </div>
      <Card>
        <div className="flex flex-col">
          <Typography.Text strong>{question.title}</Typography.Text>
          <Typography.Text>Dificuldade</Typography.Text>
          <Progress percent={parseInt(question.difficulty)} format={(t) => t} />
          <Markdown>{question.context}</Markdown>
          {/* <div className="flex gap-4 flex-wrap">
            {imageFiles.map((file) => (
              <Image
                src={file}
                alt="image"
                key={nanoid()}
                className="max-w-xs"
              />
            ))}
          </div> */}
          <Typography.Paragraph>
            {question.alternativesIntroduction}
          </Typography.Paragraph>
          <List
            dataSource={alternatives}
            renderItem={(item) => (
              <List.Item>
                {item.text ? (
                  <Typography.Text mark={item.isCorrect && isOpen}>
                    <Typography.Text strong className="mr-2">
                      {item.letter}.
                    </Typography.Text>
                    {item.text}
                  </Typography.Text>
                ) : null}
                {item.file ? (
                  <Typography.Text mark={item.isCorrect && isOpen}>
                    <Typography.Text strong className="mr-2">
                      {item.letter}.
                    </Typography.Text>
                    <Image src={item.file} alt="image" />
                  </Typography.Text>
                ) : null}
              </List.Item>
            )}
          />
        </div>
      </Card>
    </Card>
  );
}
