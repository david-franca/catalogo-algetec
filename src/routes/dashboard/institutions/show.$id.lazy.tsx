import { ShowHeader } from "@/components/headers";
import { InstitutionShowForm } from "@/components/pages/institutions";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/institutions/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/institutions/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="institutions" id={id} />
      <InstitutionShowForm />
    </div>
  );
}
