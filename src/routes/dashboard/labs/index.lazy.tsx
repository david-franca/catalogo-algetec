import { ListHeader } from "@/components/headers";
import { LabTable } from "@/components/pages/lab";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/labs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="labs" showNew={false} />
      <LabTable />
    </div>
  );
}
