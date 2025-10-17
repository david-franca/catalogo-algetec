import { ShowHeader } from "@/components/headers";
import { WikiShowForm } from "@/components/pages/wiki/form/show-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/wiki/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/wiki/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="wiki" id={id} />
      <WikiShowForm id={id} />
    </div>
  );
}
