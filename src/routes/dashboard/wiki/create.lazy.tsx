import { CreateHeader } from "@/components/headers";
import { WikiCreateForm } from "@/components/pages/wiki/form/create-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/wiki/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="wiki" />
      <WikiCreateForm />
    </div>
  );
}
