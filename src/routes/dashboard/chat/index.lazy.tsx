import { MainChat } from "@/components/pages/chat";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainChat />;
}
