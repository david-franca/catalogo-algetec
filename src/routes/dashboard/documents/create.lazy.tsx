import { CreateHeader } from "@/components/headers";
import { DocumentForm } from "@/components/pages/documents/form/form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/documents/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="documents" />
      <DocumentForm />
    </div>
  );
}
