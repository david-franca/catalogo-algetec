import { ProfilePage } from "@/components/pages/profile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilePage />;
}
