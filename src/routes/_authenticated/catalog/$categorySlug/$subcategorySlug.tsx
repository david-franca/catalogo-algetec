import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/catalog/$categorySlug/$subcategorySlug"
)({
  component: RouteComponent,
  loader: ({ params }) => {
    return {
      crumb: {
        text: params.subcategorySlug,
        to: "/catalog/$categorySlug/$subcategorySlug",
      },
    };
  },
});

function RouteComponent() {
  const { categorySlug, subcategorySlug } = useParams({
    from: "/_authenticated/catalog/$categorySlug/$subcategorySlug",
  });
  return (
    <div>
      Hello "/_authenticated/catalog/{categorySlug}/{subcategorySlug}"!
    </div>
  );
}
