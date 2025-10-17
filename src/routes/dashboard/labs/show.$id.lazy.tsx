import { ShowHeader } from "@/components/headers";
import LabShowForm from "@/components/pages/lab/form/show-form";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/labs/show/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/dashboard/labs/show/$id" });
  return (
    <div className="flex flex-col space-y-2">
      <ShowHeader
        resource="labs"
        id={id}
        urlEdit={`https://catalogoalgetec.grupoa.education/dashboard/experiments/edit?id=[${id}]`}
      />
      <LabShowForm id={id} />
    </div>
  );
}
