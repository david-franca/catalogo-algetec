import { createFileRoute } from "@tanstack/react-router";

import { Productcard } from "@/components/shared/product-card";
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
  return <Productcard data={data} />;
}
