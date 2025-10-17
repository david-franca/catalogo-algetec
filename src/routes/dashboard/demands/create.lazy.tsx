import { CreateHeader } from "@/components/headers";
import { CreateDemandPage } from "@/components/pages/demands";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/demands/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="demands" />
      <CreateDemandPage />
    </div>
  );
}
