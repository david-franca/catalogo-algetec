import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/dashboard/curriculums/practices/edit/$id"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/curriculums/practices/edit/$id!";
}
