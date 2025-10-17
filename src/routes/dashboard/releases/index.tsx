import { releaseSearchSchema } from "@/schemas/release.schema";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/dashboard/releases/")({
  validateSearch: zodValidator(releaseSearchSchema),
});
