import { DesignerQuestion } from "@/types/question";
import { apiClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

function interpolar(valor: number, min: number, max: number) {
  if (max === min) {
    throw new Error("O valor mínimo e o máximo não podem ser iguais.");
  }
  return ((valor - min) / (max - min)) * 100;
}

interface EnemQuestionProps {
  params: {
    object?: string;
    skill?: string;
    discipline?: string;
  };
  enabled?: boolean;
}

export function useGetEnemQuestions({
  params: { discipline, object, skill },
  enabled,
}: EnemQuestionProps) {
  return useQuery({
    queryKey: ["enem-questions", object, discipline, skill, enabled],
    queryFn: async () => {
      const { data } = await apiClient.get<DesignerQuestion>(
        "/document-designer/questions",
        {
          params: {
            object,
            skill,
            discipline,
          },
        }
      );

      const res = data.questions.map((item) => {
        item.difficulty = interpolar(
          parseFloat(item.difficulty),
          parseFloat(data.questions[0].difficulty),
          parseFloat(data.questions[data.questions.length - 1].difficulty)
        ).toString();
        return item;
      });

      return res.sort(
        (a, b) => parseFloat(a.difficulty) - parseFloat(b.difficulty)
      );
    },
    retry: 3,
    retryDelay: 3000,
    enabled,
  });
}
