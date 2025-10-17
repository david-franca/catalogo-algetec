import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { useDesigner } from "@/hooks/useDesigner";
import { ReviewScript, ReviewScriptSchema } from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useReviewScripts() {
  const {
    area_of_knowledge,
    curricular_component,
    name,
    necessary_materials,
    procedures,
    result_analysis,
    descricao_do_experimento,
    objetivo_geral,
    conceitos,
    skills,
    knowledge_objectives,
    config: { instructions, model },
    focus,
    setRequestResult,
  } = useDesigner();
  return useMutation({
    mutationFn: async (value?: string) => {
      setRequestResult({ status: "ongoing", type: "review-scripts", id: 0 });
      const body = ReviewScriptSchema.parse({
        model,
        instrucao_geral: instructions,
        instrucao_adicional: value,
        area_of_knowledge,
        curricular_component,
        name,
        script: {
          necessary_materials: necessary_materials?.map((item, id) => ({
            id: id + 1,
            item,
          })),
          procedures: procedures?.map((item, id) => ({
            ...item,
            id: id + 1,
          })),
          result_analysis: result_analysis?.map((item, id) => ({
            ...item,
            id: id + 1,
          })),
        },
        conceitos: conceitos?.map((item, id) => ({
          ...item,
          id: id + 1,
        })),
        descricao_do_experimento,
        objetivo_geral,
        habilidades: skills?.map((item, id) => ({
          ...item,
          id: id + 1,
        })),
        objetivos_de_aprendizagem: knowledge_objectives?.map((item, id) => ({
          ...item,
          id: id + 1,
        })),
        focus,
      } as ReviewScript);

      const { data } = await apiClient.post<{
        id: number;
        type: string;
        status: string;
      }>("/document-designer/async/review-scripts", body);

      return data;
    },
    onSuccess(data) {
      toast.success("Solicitação gerada com sucesso!");
      setRequestResult(data);
    },
    onError(error) {
      setRequestResult({ status: "error", type: "review-script", id: 0 });
      if (isZodErrorLike(error)) {
        const zodError = fromZodError(error);
        return toast.error(zodError.toString());
      }

      return toast.error("Error ao gerar conteúdo");
    },
    retry: 3,
    retryDelay: 3000,
  });
}
