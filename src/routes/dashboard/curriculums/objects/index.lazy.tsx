import { ListHeader } from "@/components/headers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/curriculums/objects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="objects" />
      {/* <PracticesTable /> */}
    </div>
  );
}
