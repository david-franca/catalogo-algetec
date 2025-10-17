import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const demandSearchSchema = z
  .object({
    experimentId: z.string().optional(),
    experiment: z.string().optional(),
    finishedAtStart: z.string().optional(),
    finishedAtEnd: z.string().optional(),
    institutions: z.string().array().optional(),
    tags: z.string().array().optional(),
    status: z.string().array().optional(),
    scripting: z.string().array().optional(),
    modeling: z.string().array().optional(),
    coding: z.string().array().optional(),
    testing: z.string().array().optional(),
    ualab: z.string().array().optional(),
    designing: z.string().array().optional(),
    author: z.string().optional(),
  })
  .merge(metaSchema);

export type DemandSearchParams = z.infer<typeof demandSearchSchema>;
