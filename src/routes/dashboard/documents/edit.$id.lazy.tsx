import { EditHeader } from "@/components/headers";
import { DocumentForm } from "@/components/pages/documents/form/form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/documents/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/documents/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="documents" />
      <DocumentForm id={id} />
    </div>
  );
}
