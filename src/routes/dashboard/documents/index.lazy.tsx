import { ListHeader } from "@/components/headers";
import { DocumentsTable } from "@/components/pages/documents";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/documents/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="documents" />
      <DocumentsTable />
    </div>
  );
}
