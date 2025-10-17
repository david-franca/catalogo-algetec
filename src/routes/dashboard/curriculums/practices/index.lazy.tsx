import { ListHeader } from "@/components/headers";
import { PracticesTable } from "@/components/pages/practices/table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/curriculums/practices/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="practices" />
      <PracticesTable />
    </div>
  );
}
