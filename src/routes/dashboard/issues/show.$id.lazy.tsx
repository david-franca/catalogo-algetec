import { ShowHeader } from "@/components/headers";
import IssueShowForm from "@/components/pages/issues/form/show-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/issues/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/issues/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="issues" id={id} />
      <IssueShowForm id={id} />
    </div>
  );
}
