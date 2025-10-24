import z from "zod";

export const equivalenciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const tagsSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  equivalencies: z.array(equivalenciesSchema).optional(),
});

export const experimentsSchema = z.object({
  id: z.string(),
  field_id: z.number(),
  original_experiment_id: z.string().nullish(),
  name: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
  web: z.boolean(),
  pt: z.boolean(),
  en: z.boolean(),
  es: z.boolean(),
  android: z.boolean(),
  ios: z.boolean(),
  status: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  test: z.string().nullish(),
  approved: z.boolean(),
  tags: z.array(tagsSchema).optional(),
});

export type Experiments = z.infer<typeof experimentsSchema>;
export type Equivalencies = z.infer<typeof equivalenciesSchema>;
export type Tags = z.infer<typeof tagsSchema>;
