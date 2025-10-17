import { AnalyzeScript } from "@/components/pages/chat";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/chat/analyze-scripts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AnalyzeScript />;
}
