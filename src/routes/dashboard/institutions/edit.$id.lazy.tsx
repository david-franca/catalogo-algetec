import { EditHeader } from "@/components/headers";
import { InstitutionEditForm } from "@/components/pages/institutions";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/institutions/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/institutions/edit/$id" });

  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="institutions" />
      <InstitutionEditForm />
    </div>
  );
}
