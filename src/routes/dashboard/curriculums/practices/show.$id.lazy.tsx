import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/dashboard/curriculums/practices/show/$id"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/curriculums/practices/show/$id!";
}
