import z from "zod";

export const DemonstrationSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  institution: z.string(),
});

export type Demonstration = z.infer<typeof DemonstrationSchema>;
