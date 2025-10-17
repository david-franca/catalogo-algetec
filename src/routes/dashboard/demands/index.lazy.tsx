import { ListHeader } from "@/components/headers";
import { DemandTable } from "@/components/pages/demands";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/demands/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="demands" />
      <DemandTable />
    </div>
  );
}
