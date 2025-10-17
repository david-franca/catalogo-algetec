import { checklistSearchSchema } from "@/schemas/checklist.schema";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/checklists/")({
  validateSearch: zodValidator(checklistSearchSchema),
});
