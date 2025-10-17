import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const showFormSchema = z.object({
  tab: z.string().default("details"),
});

export const Route = createFileRoute("/dashboard/labs/show/$id")({
  validateSearch: zodValidator(showFormSchema),
});
