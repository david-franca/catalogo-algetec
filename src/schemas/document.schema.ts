import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const documentSearchSchema = z
  .object({
    experimentId: z.string().optional(),
  })
  .merge(metaSchema);

export type DocumentSearch = z.infer<typeof documentSearchSchema>;
