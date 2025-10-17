import { ShowHeader } from "@/components/headers";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/checklists/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/checklists/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="checklists" id={id} />
    </div>
  );
}
