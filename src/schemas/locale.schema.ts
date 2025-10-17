import { z } from "zod";

import { metaSchema } from "./meta.schema";

export const localeSearchSchema = z
  .object({
    experimentId: z.string().optional(),
    language: z.string().optional(),
  })
  .merge(metaSchema);

export type LocaleSearchParams = z.infer<typeof localeSearchSchema>;

export const localeShowSchema = z.object({
  language: z.string(),
  version: z.string().optional(),
});

export type LocaleShowParams = z.infer<typeof localeShowSchema>;
