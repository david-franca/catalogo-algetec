import { skillSearchSchema } from "@/schemas/skills.schema";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/curriculums/skills/")({
  validateSearch: zodValidator(skillSearchSchema),
});
