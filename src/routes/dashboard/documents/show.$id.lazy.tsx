import { ShowHeader } from "@/components/headers";
import { DocumentShowForm } from "@/components/pages/documents/form/show-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/documents/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/documents/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="documents" id={id} canExport />
      <DocumentShowForm />
    </div>
  );
}
