import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/catalog/$categorySlug/$subcategorySlug"
)({
  component: () => <Outlet />,
  loader: ({ params }) => {
    return {
      crumb: {
        text: params.subcategorySlug,
        to: "/catalog/$categorySlug/$subcategorySlug",
      },
    };
  },
});
