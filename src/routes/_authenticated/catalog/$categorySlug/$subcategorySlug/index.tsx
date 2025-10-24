import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
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
  "/_authenticated/catalog/$categorySlug/$subcategorySlug/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { subcategorySlug, categorySlug } = useParams({
    from: "/_authenticated/catalog/$categorySlug/$subcategorySlug",
  });
  const { data, isLoading, isError, error } = useGetFields(subcategorySlug);

  const navigate = useNavigate();

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
          <ImageWithFallback
            src={item.image!}
            alt={item.name}
            className="w-full p-12 object-cover"
          />
          <CardHeader
            className="pb-6 hover:cursor-pointer"
            onClick={() =>
              void navigate({
                to: "/catalog/$categorySlug/$subcategorySlug/$experimentId",
                params: {
                  experimentId: item.id,
                  categorySlug,
                  subcategorySlug,
                },
              })
            }
          >
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
