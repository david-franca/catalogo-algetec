import { z } from "zod";
import { metaSchema } from "./meta.schema";

export const objectSearchSchema = z.object({}).merge(metaSchema);
