import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const FieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  tags: z.array(TagSchema),
});

export const FieldsResponseSchema = z.array(FieldSchema);

export type FieldsResponse = z.infer<typeof FieldsResponseSchema>;
export type Field = z.infer<typeof FieldSchema>;
export type Tag = z.infer<typeof TagSchema>;
