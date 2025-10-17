import { ShowHeader } from "@/components/headers";
import { LocaleShowForm } from "@/components/pages/locales/form/show-form";
import {
  createLazyFileRoute,
  useParams,
  useSearch,
} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/locales/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/locales/show/$id" });
  const { language, version } = useSearch({
    from: "/dashboard/locales/show/$id",
  });

  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader
        resource="locales"
        id={id}
        search={{ language, version }}
        queryKey={["locales", id, language, version]}
        canDelete={false}
      />
      <LocaleShowForm />
    </div>
  );
}
