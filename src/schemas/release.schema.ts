import { z } from "zod";
import { metaSchema } from "./meta.schema";

export const releaseSearchSchema = z
  .object({
    creator: z.string().array().optional(),
    name: z.string().optional(),
    experiment: z.string().optional(),
    id0: z.string().optional(),
    id5000: z.string().optional(),
    id10000: z.string().optional(),
    playStore: z.string().optional(),
    languages: z.string().optional(),
    platformA: z.string().optional(),
  })
  .merge(metaSchema);

export type ReleaseSearchParams = z.infer<typeof releaseSearchSchema>;
