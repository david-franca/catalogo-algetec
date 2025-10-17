import { ListHeader } from "@/components/headers";
import { Calendar } from "@/components/pages/calendar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="calendar" showNew={false} />
      <Calendar />
    </div>
  );
}
