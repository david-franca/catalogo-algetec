import { updateSystemContext } from "@/hooks/useChat";
import { useDesigner } from "@/hooks/useDesigner";
import {
  DesignerConceptsResponse,
  requiredOptionsSchema,
} from "@/types/designer";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useDesignerConcepts() {
  const {
    area_of_knowledge,
    curricular_component,
    name,
    necessary_materials,
    procedures,
    result_analysis,
    config: { instructions, model },
    focus,
    setConcepts,
    setRequestResult,
  } = useDesigner();
  return useMutation({
    mutationFn: async (value?: string) => {
      const body = requiredOptionsSchema.parse({
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
          focus,
        },
      });
      const { data } = await apiClient.post<DesignerConceptsResponse>(
        "/document-designer/concepts",
        body
      );

      updateSystemContext(data);
      return data;
    },
    onSuccess(data) {
      setConcepts({ conceitos: data.conceitos });
      setRequestResult({ status: "completed", type: "concepts", id: 0 });
    },
    onError() {
      setRequestResult({ status: "error", type: "concepts", id: 0 });
    },
    retry: 3,
    retryDelay: 3000,
  });
}
