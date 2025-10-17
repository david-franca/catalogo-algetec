import { EditHeader } from "@/components/headers";
import { WikiEditForm } from "@/components/pages/wiki/form/edit-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/wiki/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/wiki/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="wiki" />
      <WikiEditForm id={id} />
    </div>
  );
}
