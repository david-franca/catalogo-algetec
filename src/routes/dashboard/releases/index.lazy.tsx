import { ListHeader } from "@/components/headers";
import { ReleaseTable } from "@/components/pages/releases/table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/releases/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="releases" openInNewTab />
      <ReleaseTable />
    </div>
  );
}
