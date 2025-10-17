import { CreateHeader } from "@/components/headers";
import { LocalesCreateForm } from "@/components/pages/locales/form/create-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/locales/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="locales" />
      <LocalesCreateForm />
    </div>
  );
}
