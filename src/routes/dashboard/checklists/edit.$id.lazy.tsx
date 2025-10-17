import { EditHeader } from "@/components/headers";
import { ChecklistEditForm } from "@/components/pages/checklist/form/edit-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/checklists/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/checklists/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader resource="checklists" id={id} />
      <ChecklistEditForm id={id} />
    </div>
  );
}
