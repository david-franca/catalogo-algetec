import { z } from "zod";

const CompetencySkillSchema = z.object({
  exemplos_de_aplicacao: z.array(z.string()),
  area_do_conhecimento: z.string(),
  codigo_da_competencia: z.string(),
  descricao_da_competencia: z.string(),
  codigo_da_habilidade: z.string(),
  descricao_da_habilidade: z.string(),
});

const KnowledgeObjectSchema = z.object({
  objects: z.array(
    z.object({
      object_name: z.string(),
      relevance_score: z.number().optional(),
    })
  ),
  category_name: z.string(),
});

export const FocusSchema = z.object({
  competencySkills: z.array(CompetencySkillSchema).optional(),
  knowledgeObjects: z.array(KnowledgeObjectSchema).optional(),
});

export type Focus = z.infer<typeof FocusSchema>;
