import { localeSearchSchema } from "@/schemas";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/locales/")({
  validateSearch: zodValidator(localeSearchSchema),
});
