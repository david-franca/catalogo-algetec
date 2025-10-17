import { updateSystemContext } from "@/hooks/useChat";
import { useDesigner } from "@/hooks/useDesigner";
import {
  correlatedCompetencesSchema,
  EvaluateSkillsResponseSchema,
} from "@/types/designer";
import { Focus } from "@/types/focus";
import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useDesignerRequest() {
  const isDev = import.meta.env.DEV;

  const {
    setKnowledgeObjects,
    setCorrelatedCompetences,
    setRequestResult,
    setQuestions,
    setFocus,
    setSkills,
    setDescription,
    setNecessaryMaterials,
    setProcedures,
    setResultAnalysis,
    setKnowledgeObjectives,
    setConcepts,
    focus: designerFocus,
  } = useDesigner();

  return useMutation({
    mutationFn: async ({ id, type }: { id?: number; type?: string }) => {
      const { data } = await apiClient.get(`/document-designer/requests/${id}`);

      updateSystemContext(data);

      const handleFocus = (data: unknown, source: string) => {
        if (source === "knowledge-objects") {
          const focus: Focus["knowledgeObjects"] = [];
          const knowledge_objects = correlatedCompetencesSchema
            .partial()
            .parse(data);

          knowledge_objects?.higly_correlated?.forEach((correlated) => {
            correlated.categories.forEach((category) => {
              category.objects.forEach(() => {
                focus.push({
                  category_name: category.category_name,
                  objects: category.objects,
                });
              });
            });
          });
          knowledge_objects?.low_correlated?.forEach((correlated) => {
            correlated.categories.forEach((category) => {
              category.objects.forEach(() => {
                focus.push({
                  category_name: category.category_name,
                  objects: category.objects,
                });
              });
            });
          });
          knowledge_objects?.medium_correlated?.forEach((correlated) => {
            correlated.categories.forEach((category) => {
              category.objects.forEach(() => {
                focus.push({
                  category_name: category.category_name,
                  objects: category.objects,
                });
              });
            });
          });
          setFocus({ ...designerFocus, knowledgeObjects: focus });

          return knowledge_objects;
        }
        if (source === "evaluate-skills") {
          const focus: Focus["competencySkills"] = [];
          const correlated_competences =
            EvaluateSkillsResponseSchema.partial().parse(data);

          correlated_competences?.higly_correlated?.forEach((item) => {
            item.competencias.forEach((competencia) => {
              competencia.habilidades.forEach((habilidade) => {
                if (habilidade.on_focus) {
                  focus.push({
                    area_do_conhecimento: item.area_do_conhecimento,
                    codigo_da_competencia: competencia.category_name,
                    codigo_da_habilidade: habilidade.codigo_da_habilidade,
                    descricao_da_competencia:
                      competencia.descricao_da_competencia,
                    descricao_da_habilidade: habilidade.descricao_da_habilidade,
                    exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
                  });
                }
              });
            });
          });
          correlated_competences?.medium_correlated?.forEach((item) => {
            item.competencias.forEach((competencia) => {
              competencia.habilidades.forEach((habilidade) => {
                if (habilidade.on_focus) {
                  focus.push({
                    area_do_conhecimento: item.area_do_conhecimento,
                    codigo_da_competencia: competencia.codigo_da_competencia,
                    codigo_da_habilidade: habilidade.codigo_da_habilidade,
                    descricao_da_competencia:
                      competencia.descricao_da_competencia,
                    descricao_da_habilidade: habilidade.descricao_da_habilidade,
                    exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
                  });
                }
              });
            });
          });
          correlated_competences?.low_correlated?.forEach((item) => {
            item.competencias.forEach((competencia) => {
              competencia.habilidades.forEach((habilidade) => {
                if (habilidade.on_focus) {
                  focus.push({
                    area_do_conhecimento: item.area_do_conhecimento,
                    codigo_da_competencia: competencia.codigo_da_competencia,
                    codigo_da_habilidade: habilidade.codigo_da_habilidade,
                    descricao_da_competencia:
                      competencia.descricao_da_competencia,
                    descricao_da_habilidade: habilidade.descricao_da_habilidade,
                    exemplos_de_aplicacao: habilidade.exemplos_de_aplicacao,
                  });
                }
              });
            });
          });

          setFocus({ ...designerFocus, competencySkills: focus });
          return correlated_competences;
        }
      };

      switch (type) {
        case "review-script":
          updateSystemContext(data);
          setDescription({
            descricao_do_experimento: data.description,
            objetivo_geral: data.objetivo_geral,
          });
          setNecessaryMaterials(
            data.script.necessary_materials.map((m: { item: string }) => m.item)
          );
          setProcedures(data.script.procedures);
          setResultAnalysis({ result_analysis: data.script.result_analysis });
          setSkills({ skills: data.habilidades_cognitivas });
          setKnowledgeObjectives({
            knowledge_objectives: data.objetivos_de_aprendizagem,
          });
          setConcepts({ conceitos: data.conceitos });
          setRequestResult({ status: "completed", id: id as number, type });
          break;
        case "review-question":
          updateSystemContext(data);
          setDescription({
            descricao_do_experimento: data.description,
            objetivo_geral: data.objetivo_geral,
          });
          setNecessaryMaterials(
            data.script.necessary_materials.map((m: { item: string }) => m.item)
          );
          setProcedures(data.script.procedures);
          setResultAnalysis({ result_analysis: data.script.result_analysis });
          setSkills({ skills: data.habilidades_cognitivas });
          setKnowledgeObjectives({
            knowledge_objectives: data.objetivos_de_aprendizagem,
          });
          setConcepts({ conceitos: data.conceitos });
          setRequestResult({ status: "completed", id: id as number, type });
          break;
        case "knowledge-objects":
          setKnowledgeObjects({
            knowledge_objects: correlatedCompetencesSchema
              .partial()
              .parse(data),
          });
          handleFocus(data, "knowledge-objects");
          setRequestResult({ status: "completed", id: id as number, type });
          break;
        case "evaluate-skills":
          setCorrelatedCompetences({
            correlated_competences:
              EvaluateSkillsResponseSchema.partial().parse(data),
          });
          handleFocus(data, "evaluate-skills");
          setRequestResult({ status: "completed", id: id as number, type });
          break;
        case "questions":
          setQuestions({ questions: data });
          setRequestResult({ status: "completed", id: id as number, type });
          break;
        default:
          break;
      }
      return data;
    },
    retry: 9,
    retryDelay: isDev ? 1000 : 12000 * 4,
    onError: () => {
      setRequestResult({ status: "error", type: "request", id: 0 });
    },
  });
}
