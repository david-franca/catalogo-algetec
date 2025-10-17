import { useDesigner } from "@/hooks/useDesigner";
import { EvaluateSkillsResponseSchema } from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useSkillsQuestions() {
  const { correlated_competences, setRequestResult } = useDesigner();

  return useMutation({
    mutationFn: async () => {
      const body = EvaluateSkillsResponseSchema.parse(correlated_competences);
      const { data } = await apiClient.post<{
        id: number;
        type: string;
        status: string;
      }>("/document-designer/questions", body);

      return data;
    },
    onSuccess(data) {
      setRequestResult(data);
    },
    onError() {
      setRequestResult({ status: "error", type: "questions", id: 0 });
    },
  });
}
