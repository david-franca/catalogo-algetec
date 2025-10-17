import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const skillSearchSchema = z
  .object({
    competenceCurriculumName: z.string().optional(),
    competenceAreaName: z.string().optional(),
    competenceCode: z.string().optional(),
    competenceDescription: z.string().optional(),
    code: z.string().optional(),
    description: z.string().optional(),
    objects: z.string().array().optional(),
    notes: z.string().optional(),
  })
  .merge(metaSchema);

export type SkillSearchParams = z.infer<typeof skillSearchSchema>;
