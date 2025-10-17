import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const issuesSearchSchema = z
  .object({
    experiment: z.string().optional(),
    problem: z.string().optional(),
    priority: z.string().array().optional(),
    status: z.string().array().optional(),
    approved: z.boolean().optional(),
    creator: z.string().array().optional(),
    responsible: z.string().array().optional(),
  })
  .merge(metaSchema);

export type IssueSearchSchema = z.infer<typeof issuesSearchSchema>;
