import { localeShowSchema } from "@/schemas";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/locales/show/$id")({
  validateSearch: zodValidator(localeShowSchema),
});
