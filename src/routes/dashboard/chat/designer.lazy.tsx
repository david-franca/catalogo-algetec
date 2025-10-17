import { DesignerPage } from "@/components/pages/chat/designer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/chat/designer")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DesignerPage />;
}
