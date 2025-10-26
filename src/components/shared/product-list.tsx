import { Link } from "@tanstack/react-router";
import { Package } from "lucide-react"; // Ícone fallback

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mesma interface ExperimentItem
interface ProductListProps {
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

export function ProductList({ data }: ProductListProps) {
  return (
    <div>
      {data?.map((product) => (
        <div
          key={crypto.randomUUID()}
          className="flex items-center gap-4 border-b p-4 hover:bg-muted/50"
        >
          <Avatar className="hidden h-12 w-12 sm:flex">
            {" "}
            {/* Ajuste tamanho */}
            <AvatarImage src={product.image ?? undefined} alt={product.name} />
            <AvatarFallback>
              <Package className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1 flex-1">
            <Link
              to="/catalog/$categorySlug/$subcategorySlug/$experimentId"
              params={{
                categorySlug: product.categorySlug,
                subcategorySlug: product.subcategorySlug,
                experimentId: product.id, // ou String(product.id)
              }}
              className="font-medium hover:underline"
            >
              {product.name}
            </Link>
            {/* Adicione outras informações relevantes aqui */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.name ?? "Descrição não disponível."} {/* Exemplo */}
            </p>
          </div>
          {/* Pode adicionar um botão de ação aqui se quiser */}
          {/* <Button variant="outline" size="sm" asChild>
           <Link to=...>Ver Detalhes</Link>
       </Button> */}
        </div>
      ))}
    </div>
  );
}
