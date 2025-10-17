import { ListHeader } from "@/components/headers";
import { UserTable } from "@/components/pages/users";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/users/")({
  component: UserListPage,
});

function UserListPage() {
  return (
    <div className="flex flex-col space-y-2">
      <ListHeader resource="users" />
      <UserTable />
    </div>
  );
}
