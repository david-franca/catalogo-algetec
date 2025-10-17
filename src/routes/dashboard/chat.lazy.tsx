import { ListHeader } from "@/components/headers";
import { ChatMenu } from "@/components/pages/chat";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="chat" showNew={false} />
      <div className="flex items-center justify-start h-[80vh] space-x-2">
        <ChatMenu />
        <div className="w-4/5 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
