import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/dashboard/curriculums/skills/edit/$id"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/curriculums/skills/edit/$id!";
}
