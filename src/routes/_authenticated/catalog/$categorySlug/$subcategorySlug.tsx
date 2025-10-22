import { createFileRoute, useParams } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetFields } from "@/features/fields/hooks/useGetFields";

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
  const { subcategorySlug } = useParams({
    from: "/_authenticated/catalog/$categorySlug/$subcategorySlug",
  });
  const { data, isLoading, isError, error } = useGetFields(subcategorySlug);

  if (isLoading) {
    return <CardContent>Loading...</CardContent>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <CardContent
      className="grid 
          gap-4 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4"
    >
      {data?.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02] p-0"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <CardHeader className="pb-6">
            <CardAction>
              <Checkbox
                onCheckedChange={(value) =>
                  console.log("Changed :", value, item.name)
                }
              />
            </CardAction>
            <CardTitle>ID: {item.id}</CardTitle>
            <CardDescription>{item.name}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </CardContent>
  );
}
