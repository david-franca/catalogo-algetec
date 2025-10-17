import { z } from "zod";
import { metaSchema } from "./meta.schema";

export const checklistSearchSchema = z
  .object({
    name: z.string().optional(),
  })
  .merge(metaSchema);

export type ChecklistSearch = z.infer<typeof checklistSearchSchema>;
