import { ListHeader } from "@/components/headers";
import { SkillListTable } from "@/components/pages/skills/table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/curriculums/skills/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="skills" />
      <SkillListTable />
    </div>
  );
}
