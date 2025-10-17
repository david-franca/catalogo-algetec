import { EditHeader } from "@/components/headers";
import { DemandEditForm } from "@/components/pages/demands";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/demands/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/demands/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="demands" />
      <DemandEditForm />
    </div>
  );
}
