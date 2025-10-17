import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const userSearchSchema = z
  .object({
    name: z.string().optional(),
    roles: z.string().array().optional(),
    departments: z.string().array().optional(),
  })
  .merge(metaSchema);

export type UserSearchParams = z.infer<typeof userSearchSchema>;
