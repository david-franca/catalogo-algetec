import { useDesigner } from "@/hooks/useDesigner";
import {
  KnowledgeObjectivesResponse,
  LearningObjectives,
  LearningObjectivesBodySchema,
} from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { updateSystemContext } from "@/hooks/useChat";

export function useLearningObjectives() {
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
    config: { instructions, model },
    focus,
    setKnowledgeObjectives,
    setRequestResult,
  } = useDesigner();

  return useMutation({
    mutationFn: async (value?: string) => {
      const body = LearningObjectivesBodySchema.parse({
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
        focus,
      } as LearningObjectives);
      const { data } = await apiClient.post<KnowledgeObjectivesResponse>(
        "/document-designer/learning-objectives",
        body
      );

      updateSystemContext(data);

      return data;
    },
    onSuccess(data) {
      setRequestResult({
        status: "completed",
        type: "learning-objectives",
        id: 0,
      });
      setKnowledgeObjectives({
        knowledge_objectives: data.objetivos_de_aprendizagem,
      });
    },
    onError() {
      setRequestResult({
        status: "error",
        type: "learning-objectives",
        id: 0,
      });
    },
    retry: 3,
    retryDelay: 3000,
  });
}
