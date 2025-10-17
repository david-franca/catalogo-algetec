import { EditHeader } from "@/components/headers";
import { UserEditForm } from "@/components/pages/users";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/users/edit/$id")({
  component: UserEditPage,
});

function UserEditPage() {
  const { id } = useParams({ from: "/dashboard/users/edit/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <EditHeader id={id} resource="users" />
      <UserEditForm />
    </div>
  );
}
