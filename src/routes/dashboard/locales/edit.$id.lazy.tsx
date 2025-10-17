import { EditHeader } from "@/components/headers";
import { LocaleEditForm } from "@/components/pages/locales/form/edit-form";
import {
  createLazyFileRoute,
  useParams,
  useSearch,
} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/locales/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/locales/edit/$id" });
  const { language, version } = useSearch({
    from: "/dashboard/locales/edit/$id",
  });

  return (
    <div className="flex flex-col space-y-2">
      <EditHeader
        id={id}
        resource="locales"
        queryKey={["locales", id, language, version]}
      />
      <LocaleEditForm />
    </div>
  );
}
