import { createFileRoute } from "@tanstack/react-router";

import { useModeView } from "@/app/store/modeViewStore";
import { Productcard } from "@/components/shared/product-card";
import { ProductList } from "@/components/shared/product-list";
import { CardContent } from "@/components/ui/card";
import { useGetSearchFields } from "@/features/fields/hooks/useGetSearchFields";

export const Route = createFileRoute("/_authenticated/catalog/news")({
  component: RouteComponent,
  pendingComponent: () => <CardContent>Loading...</CardContent>,
  errorComponent: () => <CardContent>Error: Something went wrong</CardContent>,
  loader: () => {
    return {
      crumb: {
        tKey: "navUser.news",
        to: "/_authenticated/catalog/news",
      },
    };
  },
});

function RouteComponent() {
  const { data } = useGetSearchFields({ isNews: true });
  const { viewMode } = useModeView();

  if (viewMode === "list") {
    return <ProductList data={data} />;
  }
  return <Productcard data={data} />;
}
