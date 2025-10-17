import { objectSearchSchema } from "@/schemas/object.schema";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/curriculums/objects/")({
  validateSearch: zodValidator(objectSearchSchema),
});
