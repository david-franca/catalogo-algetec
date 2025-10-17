import { ShowHeader } from "@/components/headers";
import { DemandShowForm } from "@/components/pages/demands";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/demands/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/demands/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="demands" id={id} />
      <DemandShowForm />
    </div>
  );
}
