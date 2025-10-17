import { EditHeader } from "@/components/headers";
import { ReleaseEditForm } from "@/components/pages/releases/form/edit-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/releases/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/releases/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader resource="releases" id={id} />
      <ReleaseEditForm id={id} />
    </div>
  );
}
