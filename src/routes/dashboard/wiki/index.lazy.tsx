import { ListHeader } from "@/components/headers";
import { WikiView } from "@/components/pages/wiki/view";
import { Button } from "antd";
import { ArchiveXIcon } from "lucide-react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/wiki/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader
        resource="wiki"
        extraActions={
          <Link to="/dashboard/wiki/archived">
            <Button icon={<ArchiveXIcon className="h-4 w-4" />}>
              Ver Arquivados
            </Button>
          </Link>
        }
      />
      <WikiView />
    </div>
  );
}
