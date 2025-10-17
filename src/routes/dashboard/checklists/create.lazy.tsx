import { CreateHeader } from "@/components/headers";
import { ChecklistCreateForm } from "@/components/pages/checklist/form/create-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/checklists/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="checklists" />
      <ChecklistCreateForm />
    </div>
  );
}
