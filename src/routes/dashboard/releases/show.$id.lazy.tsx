import { ShowHeader } from "@/components/headers";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/releases/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/releases/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="releases" id={id} />
    </div>
  );
}
