import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";

interface ProductCardProps {
  data:
    | {
        id: string;
        name: string;
        image?: string | null;
        featured?: boolean;
        beta?: boolean;
        categorySlug: string;
        subcategorySlug: string;
      }[]
    | undefined;
}

export function Productcard({ data }: ProductCardProps) {
  return (
    <div
      className="grid gap-4 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4"
    >
      {data?.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02] p-0"
        >
          <div className="relative rounded-2xl flex bg-muted p-0">
            <span
              className={cn(
                "absolute top-4 right-4  text-white px-3 py-1 rounded-full text-xs font-medium hidden",
                {
                  block: product.featured ?? product.beta,
                  "bg-red-500": product.featured,
                  "bg-yellow-500": product.beta,
                }
              )}
            >
              {product.featured && "Novidade"}
              {product.beta && "Beta"}
            </span>

            <ImageWithFallback
              src={product.image!}
              alt={product.name}
              className="object-cover rounded-t-lg w-full"
            />
          </div>
          <CardContent className="space-y-3 pb-6">
            <div className="flex items-center justify-between">
              <Link
                to="/catalog/$categorySlug/$subcategorySlug/$experimentId"
                params={{
                  experimentId: product.id,
                  categorySlug: product.categorySlug,
                  subcategorySlug: product.subcategorySlug,
                }}
                className="text-foreground text-2xl font-bold"
              >
                ID {product.id}
              </Link>
              <Button size="icon" className="px-6">
                <ShoppingCart />
              </Button>
            </div>
            <Link
              to="/catalog/$categorySlug/$subcategorySlug/$experimentId"
              params={{
                experimentId: product.id,
                categorySlug: product.categorySlug,
                subcategorySlug: product.subcategorySlug,
              }}
              className="text-foreground font-medium text-lg leading-tight"
            >
              {product.name}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
