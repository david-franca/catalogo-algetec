import { TranslationsListPage } from "@/components/pages/translations";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/translations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-2">
      <TranslationsListPage />
    </div>
  );
}
