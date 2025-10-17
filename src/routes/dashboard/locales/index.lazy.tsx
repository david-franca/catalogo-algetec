import { ListHeader } from "@/components/headers";
import { LocalesTable } from "@/components/pages/locales/table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/locales/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="locales" />
      <LocalesTable />
    </div>
  );
}
