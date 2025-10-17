import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const institutionSearchSchema = z
  .object({
    name: z.string().optional(),
  })
  .merge(metaSchema);

export type InstitutionSearchParams = z.infer<typeof institutionSearchSchema>;
