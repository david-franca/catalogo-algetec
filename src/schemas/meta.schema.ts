import { z } from "zod";

export const metaSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  field: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  hide: z.string().array().optional(),
});
