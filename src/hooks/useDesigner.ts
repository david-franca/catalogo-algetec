import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DesignerConceptsBody,
  DesignerConfigGeneral,
  DesignerCorrelatedCompetences,
  DesignerSkillCorrelatedCompetences,
  Habilidade,
  KnowledgeObjectives,
  Procedure,
  ResultAnalysis,
} from "@/types/designer";
import { Focus } from "@/types/focus";
import { QuestionRoot } from "@/types/questions";

interface DesignerBase {
  name: string | undefined;
  area_of_knowledge: string | undefined;
  curricular_component: string | undefined;
  objetivo_geral: string | undefined;
  descricao_do_experimento: string | undefined;
  necessary_materials: string[] | undefined;
  procedures: Procedure[] | undefined;
  result_analysis: ResultAnalysis[] | undefined;
  conceitos: DesignerConceptsBody[] | undefined;
  skills: Habilidade[] | undefined;
  knowledge_objectives: KnowledgeObjectives[] | undefined;
  config: DesignerConfigGeneral;
  correlated_competences: DesignerSkillCorrelatedCompetences | undefined;
  knowledge_objects: DesignerCorrelatedCompetences | undefined;
  isCorrelatedCompetences: () => boolean;
  isKnowledgeObjects: () => boolean;
  requestResult:
    | {
        id: number;
        type: string;
        status: string;
        instructions?: string;
      }
    | undefined;
  questions:
    | {
        questions: QuestionRoot | undefined;
      }
    | undefined;
  focus: Focus | undefined;
}

type DesignerHeader = Pick<
  DesignerBase,
  "name" | "area_of_knowledge" | "curricular_component"
>;
type DesignerDescription = Pick<
  DesignerBase,
  "objetivo_geral" | "descricao_do_experimento"
>;

type DesignerResultAnalysis = Pick<DesignerBase, "result_analysis">;

type DesignerConcepts = Pick<DesignerBase, "conceitos">;

type DesignerSkills = Pick<DesignerBase, "skills">;

type DesignerKnowledgeObjectives = Pick<DesignerBase, "knowledge_objectives">;

type DesignerConfig = Pick<DesignerBase, "config">;

export type DesignerKnowledgeObjects = Pick<DesignerBase, "knowledge_objects">;

export type CorrelatedCompetences = Pick<
  DesignerBase,
  "correlated_competences"
>;

interface DesignerScriptStore extends DesignerBase {
  setHeader: (header: DesignerHeader) => void;
  setDescription: (description: DesignerDescription) => void;
  setNecessaryMaterials: (materials: string[]) => void;
  setProcedures: (procedures: Procedure[]) => void;
  setResultAnalysis: (analysis: DesignerResultAnalysis) => void;
  setConcepts: (concepts: DesignerConcepts) => void;
  setSkills: (skills: DesignerSkills) => void;
  setKnowledgeObjectives: (
    knowledge_objectives: DesignerKnowledgeObjectives
  ) => void;
  setConfig: (config: DesignerConfig) => void;
  setCorrelatedCompetences: (
    correlated_competences: CorrelatedCompetences
  ) => void;
  setKnowledgeObjects: (knowledge_objects: DesignerKnowledgeObjects) => void;
  setRequestResult: (
    evaluateSkillsResult: DesignerBase["requestResult"]
  ) => void;
  setQuestions: (questions: DesignerBase["questions"]) => void;
  reset: () => void;
  setFocus: (focus: DesignerBase["focus"]) => void;
}

export const useDesigner = create(
  persist<DesignerScriptStore>(
    (set, get) => ({
      name: undefined,
      area_of_knowledge: undefined,
      curricular_component: undefined,
      objetivo_geral: undefined,
      descricao_do_experimento: undefined,
      necessary_materials: [],
      procedures: [],
      result_analysis: [],
      conceitos: [],
      skills: [],
      knowledge_objectives: [],
      config: {
        instructions: "",
        model: "o3-mini",
      },
      correlated_competences: undefined,
      knowledge_objects: undefined,
      questions: undefined,
      isCorrelatedCompetences: () => {
        const correlated_competences = get().correlated_competences;

        if (!correlated_competences) return false;
        if (
          !correlated_competences.higly_correlated &&
          !correlated_competences.medium_correlated &&
          !correlated_competences.low_correlated
        ) {
          return false;
        }
        return (
          (correlated_competences.higly_correlated?.length ?? 0) > 0 ||
          (correlated_competences.medium_correlated?.length ?? 0) > 0 ||
          (correlated_competences.low_correlated?.length ?? 0) > 0
        );
      },
      isKnowledgeObjects: () => {
        const knowledge_objects = get().knowledge_objects;
        if (!knowledge_objects) return false;
        if (
          !knowledge_objects.higly_correlated &&
          !knowledge_objects.medium_correlated &&
          !knowledge_objects.low_correlated
        ) {
          return false;
        }
        return (
          (knowledge_objects.higly_correlated?.length ?? 0) > 0 ||
          (knowledge_objects.medium_correlated?.length ?? 0) > 0 ||
          (knowledge_objects.low_correlated?.length ?? 0) > 0
        );
      },
      requestResult: undefined,
      focus: undefined,
      setHeader: (header: DesignerHeader) => set(header),
      setDescription: (description: DesignerDescription) => set(description),
      setNecessaryMaterials: (materials: string[]) =>
        set({ necessary_materials: materials }),
      setProcedures: (procedures: Procedure[]) => set({ procedures }),
      setResultAnalysis: (result_analysis: DesignerResultAnalysis) =>
        set(result_analysis),
      setConcepts: (concepts: DesignerConcepts) => set(concepts),
      setSkills: (skills: DesignerSkills) => set(skills),
      setKnowledgeObjectives: (
        knowledge_objectives: DesignerKnowledgeObjectives
      ) => set(knowledge_objectives),
      setConfig: (config: DesignerConfig) => set(config),
      setCorrelatedCompetences: (
        correlated_competences: CorrelatedCompetences
      ) => set(correlated_competences),
      setKnowledgeObjects: (knowledge_objects: DesignerKnowledgeObjects) =>
        set(knowledge_objects),
      setRequestResult: (requestResult: DesignerBase["requestResult"]) =>
        set({ requestResult }),
      setQuestions: (questions: DesignerBase["questions"]) =>
        set({ questions }),
      reset: () =>
        set({
          name: undefined,
          area_of_knowledge: undefined,
          curricular_component: undefined,
          objetivo_geral: undefined,
          descricao_do_experimento: undefined,
          necessary_materials: [],
          procedures: [],
          result_analysis: [],
          conceitos: [],
          skills: [],
          knowledge_objectives: [],
          config: {
            instructions: "",
            model: "o3-mini",
          },
          correlated_competences: undefined,
          knowledge_objects: undefined,
          questions: undefined,
        }),
      setFocus: (focus: DesignerBase["focus"]) => set({ focus }),
    }),
    {
      name: "designer",
    }
  )
);
