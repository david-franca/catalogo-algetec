import { CreateHeader } from "@/components/headers";
import { UserCreateForm } from "@/components/pages/users";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/users/create")({
  component: UserCreatePage,
});

function UserCreatePage() {
  return (
    <div className="flex flex-col space-y-2">
      <CreateHeader resource="users" />
      <UserCreateForm />
    </div>
  );
}
