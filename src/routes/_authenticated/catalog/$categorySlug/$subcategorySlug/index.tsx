import { createFileRoute, useParams } from "@tanstack/react-router";

import { useModeView } from "@/app/store/modeViewStore";
import { Productcard } from "@/components/shared/product-card";
import { ProductList } from "@/components/shared/product-list";
import { CardContent } from "@/components/ui/card";
import { useGetFields } from "@/features/fields/hooks/useGetFields";

export const Route = createFileRoute(
  "/_authenticated/catalog/$categorySlug/$subcategorySlug/"
)({
  component: RouteComponent,
  pendingComponent: () => <CardContent>Loading...</CardContent>,
  errorComponent: () => <CardContent>Error: Something went wrong</CardContent>,
});

function RouteComponent() {
  const { subcategorySlug } = useParams({
    from: "/_authenticated/catalog/$categorySlug/$subcategorySlug",
  });
  const { data } = useGetFields(subcategorySlug);
  const { viewMode } = useModeView();

  if (viewMode === "list") {
    return <ProductList data={data} />;
  }
  return <Productcard data={data} />;
}
