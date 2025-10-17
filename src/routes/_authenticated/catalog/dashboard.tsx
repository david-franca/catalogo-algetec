import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/catalog/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Início | Catálogo de Produtos" }],
  }),
  loader: () => {
    return {
      crumb: {
        tKey: "breadcrumbs.dashboard",
        to: "/_authenticated/dashboard",
      },
    };
  },
});

function RouteComponent() {
  return <div>Hello "/_authenticated/dashboard"!</div>;
}
