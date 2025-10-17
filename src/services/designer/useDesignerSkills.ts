import { updateSystemContext } from "@/hooks/useChat";
import { useDesigner } from "@/hooks/useDesigner";
import {
  DesignerSkillsBody,
  Habilidade,
  SkillsBodySchema,
} from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useDesignerSkills() {
  const {
    area_of_knowledge,
    curricular_component,
    name,
    necessary_materials,
    procedures,
    result_analysis,
    config: { instructions, model },
    conceitos,
    descricao_do_experimento,
    objetivo_geral,
    focus,
    setSkills,
    setRequestResult,
  } = useDesigner();
  return useMutation({
    mutationFn: async (value?: string) => {
      const body = SkillsBodySchema.parse({
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
        focus,
      } as DesignerSkillsBody);
      const { data } = await apiClient.post<{ habilidades: Habilidade[] }>(
        "/document-designer/skills",
        body
      );

      updateSystemContext(data);

      return data;
    },
    onSuccess(data) {
      setSkills({ skills: data.habilidades });
      setRequestResult({ status: "completed", type: "skills", id: 0 });
    },
    onError() {
      setRequestResult({ status: "error", type: "skills", id: 0 });
    },
    retry: 3,
    retryDelay: 3000,
  });
}
