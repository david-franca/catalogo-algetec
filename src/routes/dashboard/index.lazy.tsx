import { ListHeader } from "@/components/headers";
import { DashboardView } from "@/components/pages/dashboard/view";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="dashboard" showNew={false} />
      <DashboardView />
    </div>
  );
}
