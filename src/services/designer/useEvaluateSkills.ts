import { useDesigner } from "@/hooks/useDesigner";
import { EvaluateSkills, EvaluateSkillsSchema } from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

export function useEvaluateSkills() {
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
    knowledge_objects,
    config: { instructions, model },
    focus,
    setRequestResult,
  } = useDesigner();
  return useMutation({
    mutationFn: async (value?: string) => {
      const body = EvaluateSkillsSchema.parse({
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
        higly_correlated: knowledge_objects?.higly_correlated,
        medium_correlated: knowledge_objects?.medium_correlated,
        low_correlated: knowledge_objects?.low_correlated,
        focus,
      } as EvaluateSkills);

      const { data } = await apiClient.post<{
        id: number;
        type: string;
        status: string;
      }>("/document-designer/evaluate-skills", body);

      return data;
    },
    onSuccess(data) {
      setRequestResult(data);
    },
    onError(error) {
      setRequestResult({ status: "error", type: "evaluate-skills", id: 0 });
      if (isZodErrorLike(error)) {
        const zodError = fromZodError(error, {
          includePath: false,
          prefix: null,
        });
        return toast.error(zodError.toString());
      }

      return toast.error("Error ao gerar conteúdo");
    },
    retry: 3,
    retryDelay: 3000,
  });
}
