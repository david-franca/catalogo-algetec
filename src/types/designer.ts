import { z } from "zod";
import { FocusSchema } from "./focus";

export const necessaryMaterialSchema = z.object({
  id: z.number(),
  item: z.string(),
});

export type NecessaryMaterial = z.infer<typeof necessaryMaterialSchema>;

export const procedureSchema = z.object({
  id: z.number(),
  procedure: z.string({ message: "Por favor, insira um procedimento" }),
  cognitive_hint: z
    .string({ message: "Por favor, insira uma dica cognitiva" })
    .optional(),
  intermediate_text: z.string({
    message: "Por favor, insira um texto intermediário",
  }),
});

export type Procedure = z.infer<typeof procedureSchema>;

export const resultAnalysisSchema = z.object({
  question: z.string({
    message: "Por favor, insira uma pergunta de avaliação",
  }),
  id: z.number(),
});

export type ResultAnalysis = z.infer<typeof resultAnalysisSchema>;

export const scriptSchema = z.object({
  necessary_materials: z
    .array(necessaryMaterialSchema, {
      message: "Por favor, adicione os materiais necessários",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos um material",
    }),
  procedures: z
    .array(procedureSchema, {
      message: "Por favor, insira os procedimentos",
    })
    .min(1, {
      message: "Por favor, insira pelo menos um procedimento",
    }),
  result_analysis: z
    .array(resultAnalysisSchema, {
      message: "Por favor, insira as perguntas de avaliação",
    })
    .min(1, {
      message: "Por favor, insira pelo menos uma pergunta de avaliação",
    }),
});

export const requiredOptionsSchema = z.object({
  model: z.string({ message: "Por favor, selecione um modelo" }),
  area_of_knowledge: z.string({
    message: "Por favor, selecione uma área de conhecimento",
  }),
  curricular_component: z.string().optional(),
  name: z.string({ message: "Por favor, insira um nome para o experimento" }),
  instrucao_geral: z.string().optional(),
  instrucao_adicional: z.string().optional(),
  script: scriptSchema,
  focus: FocusSchema.optional(),
});

export type DesignerRequiredOptions = z.infer<typeof requiredOptionsSchema>;

export const conceptsBodySchema = z.object({
  id: z.number(),
  nome: z.string({
    message: "Por favor, insira um nome para o conceito",
  }),
  descricao: z.string({
    message: "Por favor, insira uma descrição para o conceito",
  }),
  tipo: z.string({
    message: "Por favor, insira um tipo para o conceito",
  }),
  ja_abordado: z.boolean({
    message: "Por favor, insira se o conceito já foi abordado",
  }),
});

export type DesignerConceptsBody = z.infer<typeof conceptsBodySchema>;

export const SkillsBodySchema = z
  .object({
    descricao_do_experimento: z.string({
      message: "Por favor, insira uma descrição do experimento",
    }),
    objetivo_geral: z.string({
      message: "Por favor, insira um objetivo geral",
    }),
    conceitos: conceptsBodySchema.array().min(1, {
      message: "Por favor, adicione pelo menos um conceito",
    }),
  })
  .merge(requiredOptionsSchema);

export type DesignerSkillsBody = z.infer<typeof SkillsBodySchema>;

export interface DesignerDescriptionResponse {
  descricao_do_experimento: string;
  objetivo_geral: string;
}

export interface DesignerConceptsResponse {
  conceitos: DesignerConceptsBody[];
}

export const HabilidadeSchema = conceptsBodySchema
  .omit({ ja_abordado: true })
  .strict();

export type Habilidade = z.infer<typeof HabilidadeSchema>;

export const LearningObjectivesBodySchema = z
  .object({
    habilidades: z.array(HabilidadeSchema).min(1, {
      message: "Por favor, adicione pelo menos uma habilidade",
    }),
  })
  .merge(SkillsBodySchema);

export type LearningObjectives = z.infer<typeof LearningObjectivesBodySchema>;

export const KnowledgeObjectivesSchema = z.object({
  id: z.number(),
  tipo: z.string({
    message: "Por favor, insira um tipo para o objetivo de aprendizagem",
  }),
  descricao: z.string({
    message: "Por favor, insira uma descrição para o objetivo de aprendizagem",
  }),
  relacao_com_a_pratica: z.string({
    message: "Por favor, insira uma relação com a prática",
  }),
  procedimentos_relacionados: z.array(z.number()).min(1, {
    message: "Por favor, adicione pelo menos um procedimento relacionado",
  }),
  avaliacao_do_objetivo: z.string({
    message: "Por favor, insira uma avaliação para o objetivo de aprendizagem",
  }),
});

export type KnowledgeObjectives = z.infer<typeof KnowledgeObjectivesSchema>;

export const KnowledgeObjectSchema = z
  .object({
    objetivos_de_aprendizagem: z.array(KnowledgeObjectivesSchema).min(1, {
      message: "Por favor, adicione pelo menos um objetivo de aprendizagem",
    }),
  })
  .merge(LearningObjectivesBodySchema);

export type KnowledgeObject = z.infer<typeof KnowledgeObjectSchema>;

export interface KnowledgeObjectivesResponse {
  objetivos_de_aprendizagem: KnowledgeObjectives[];
}

export const categoryObjectSchema = z.object({
  object_name: z.string({
    message: "Por favor, insira um nome para o objeto",
  }),
  on_focus: z.boolean().default(true),
  relevance_score: z.number().optional(),
});

export type CategoryObject = z.infer<typeof categoryObjectSchema>;

export const categorySchema = z.object({
  category_name: z.string({
    message: "Por favor, insira um nome para a categoria",
  }),
  objects: z.array(categoryObjectSchema).min(1, {
    message: "Por favor, adicione pelo menos um objeto",
  }),
});

export type Category = z.infer<typeof categorySchema>;

export const correlatedSchema = z.object({
  competency_area_name: z.string({
    message: "Por favor, insira um nome para a area de conhecimento",
  }),
  curriculum_component: z.string({
    message: "Por favor, insira um componente curricular",
  }),
  categories: z.array(categorySchema).min(1, {
    message: "Por favor, adicione pelo menos uma categoria",
  }),
});

export const habilidadesSchema = z.object({
  codigo_da_habilidade: z.string(),
  descricao_da_habilidade: z.string(),
  relevance_score: z.number().optional(),
  exemplos_de_aplicacao: z.string().array(),
  on_focus: z.boolean().default(true),
});

export type SkillHabilidade = z.infer<typeof habilidadesSchema>;

export const competenciasSchema = z.object({
  codigo_da_competencia: z.string(),
  descricao_da_competencia: z.string(),
  category_name: z.string(),
  habilidades: z.array(habilidadesSchema),
});

export const skillCorrelatedSchema = z.object({
  area_do_conhecimento: z.string(),
  competencias: z.array(competenciasSchema),
});

export type SkillCorrelated = z.infer<typeof skillCorrelatedSchema>;

export type Correlated = z.infer<typeof correlatedSchema>;

export const correlatedCompetencesSchema = z.object({
  higly_correlated: z
    .array(correlatedSchema, {
      message:
        "Por favor, adicione pelo menos uma correlação alta nos Objetos de Conhecimento Aplicáveis",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação alta",
    }),
  medium_correlated: z
    .array(correlatedSchema, {
      message:
        "Por favor, adicione pelo menos uma correlação média nos Objetos de Conhecimento Aplicáveis",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação media",
    }),
  low_correlated: z
    .array(correlatedSchema, {
      message:
        "Por favor, adicione pelo menos uma correlação baixa nos Objetos de Conhecimento Aplicáveis",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação baixa",
    }),
});

export type CorrelatedCompetences = z.infer<typeof correlatedCompetencesSchema>;

export const EvaluateSkillsSchema = correlatedCompetencesSchema.merge(
  KnowledgeObjectSchema
);

export type EvaluateSkills = z.infer<typeof EvaluateSkillsSchema>;

export const EvaluateSkillsResponseSchema = z.object({
  higly_correlated: z
    .array(skillCorrelatedSchema, {
      message: "Por favor, adicione pelo menos uma correlação alta",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação alta",
    }),
  medium_correlated: z
    .array(skillCorrelatedSchema, {
      message: "Por favor, adicione pelo menos uma correlação media",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação media",
    }),
  low_correlated: z
    .array(skillCorrelatedSchema, {
      message: "Por favor, adicione pelo menos uma correlação baixa",
    })
    .min(1, {
      message: "Por favor, adicione pelo menos uma correlação baixa",
    }),
});

export type EvaluateSkillsResponse = z.infer<
  typeof EvaluateSkillsResponseSchema
>;

export interface DesignerConfigGeneral {
  model: string;
  instructions: string;
}

export type DesignerCorrelatedCompetences = Partial<CorrelatedCompetences>;
export type DesignerSkillCorrelatedCompetences =
  Partial<EvaluateSkillsResponse>;

export const ReviewScriptSchema = z
  .object({
    descricao_do_experimento: z.string(),
    objetivo_geral: z.string(),
    conceitos: conceptsBodySchema.array().min(1, {
      message: "Por favor, adicione pelo menos um conceito",
    }),
    habilidades: z.array(HabilidadeSchema).min(1, {
      message: "Por favor, adicione pelo menos uma habilidade",
    }),
    objetivos_de_aprendizagem: z.array(KnowledgeObjectivesSchema).min(1, {
      message: "Por favor, adicione pelo menos um objetivo de aprendizagem",
    }),
  })
  .merge(requiredOptionsSchema);

export type ReviewScript = z.infer<typeof ReviewScriptSchema>;

export type DesignerScript = z.infer<typeof scriptSchema>;

export interface ReviewScriptResponse {
  script: DesignerScript;
  description: string;
  objetivo_geral: string;
  habilidades_cognitivas: Habilidade[];
  conceitos: DesignerConceptsBody[];
  objetivos_de_aprendizagem: KnowledgeObjectives[];
  applicable_knowledge_objects: CorrelatedCompetences;
}
