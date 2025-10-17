import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/catalog")({
  component: () => <Outlet />,
  loader() {
    return {
      crumb: {
        tKey: "breadcrumbs.home",
        to: "/catalog",
      },
    };
  },
});
