import { ShowHeader } from "@/components/headers";
import { UserShowForm } from "@/components/pages/users";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/users/show/$id")({
  component: UserShowPage,
});

function UserShowPage() {
  const { id } = useParams({ from: "/dashboard/users/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader resource="users" id={id} />
      <UserShowForm />
    </div>
  );
}
