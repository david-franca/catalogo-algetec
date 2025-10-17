import { ListHeader } from "@/components/headers";
import { WikiArchivedPage } from "@/components/pages/wiki/view/archived";
import { Button } from "antd";
import { ListIcon } from "lucide-react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/wiki/archived")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader
        resource="archived"
        showNew={false}
        extraActions={
          <Link to="/dashboard/wiki">
            <Button icon={<ListIcon className="h-4 w-4" />}>
              Voltar para a lista
            </Button>
          </Link>
        }
      />
      <WikiArchivedPage />
    </div>
  );
}
