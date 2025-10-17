import { CreateHeader } from "@/components/headers";
import { InstitutionCreateForm } from "@/components/pages/institutions";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/institutions/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="institutions" />
      <InstitutionCreateForm />
    </div>
  );
}
