import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const labSearchSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    approved: z.boolean().optional(),
    web: z.boolean().optional(),
    pt: z.boolean().optional(),
    en: z.boolean().optional(),
    es: z.boolean().optional(),
    ios: z.boolean().optional(),
    android: z.boolean().optional(),
    status: z.number().array().optional(),
  })
  .merge(metaSchema);

export type LabSearchParams = z.infer<typeof labSearchSchema>;
