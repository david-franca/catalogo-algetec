import { EditHeader } from "@/components/headers";
import { IssueEditForm } from "@/components/pages/issues/form/edit-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/issues/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/issues/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader resource="issues" id={id} />
      <IssueEditForm id={id} />
    </div>
  );
}
