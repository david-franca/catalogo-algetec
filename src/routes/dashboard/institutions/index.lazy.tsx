import { ListHeader } from "@/components/headers";
import { InstitutionsTable } from "@/components/pages/institutions";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/institutions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="institutions" />
      <InstitutionsTable />
    </div>
  );
}
