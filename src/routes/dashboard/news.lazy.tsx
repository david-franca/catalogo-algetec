import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/news")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/news!";
}
