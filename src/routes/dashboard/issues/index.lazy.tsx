import { ListHeader } from "@/components/headers";
import { IssueTable } from "@/components/pages/issues/table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/issues/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="issues" />
      <IssueTable />
    </div>
  );
}
