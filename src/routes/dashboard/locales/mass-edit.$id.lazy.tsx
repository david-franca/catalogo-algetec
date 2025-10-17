import { EditHeader } from "@/components/headers";
import { LocaleMassEditTable } from "@/components/pages/locales/table/mass-edit-table";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/locales/mass-edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/locales/mass-edit/$id" });

  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="locales" />
      <LocaleMassEditTable />
    </div>
  );
}
