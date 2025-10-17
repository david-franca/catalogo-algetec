import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/catalog/$categorySlug")({
  component: () => <Outlet />,
  loader({ params }) {
    return {
      crumb: {
        text: params.categorySlug,
        to: "/catalog/$categorySlug",
      },
    };
  },
});
