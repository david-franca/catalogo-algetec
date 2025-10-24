import { useState, useEffect, useMemo } from "react";

import { useNavigate } from "@tanstack/react-router";
import { Package, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useGetSearchFields,
  type FieldItem,
} from "@/features/fields/hooks/useGetSearchFields";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: () => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError, error } = useGetSearchFields();
  const navigate = useNavigate();

  // Limpa a busca quando o dialog é fechado
  useEffect(() => {
    if (!open) {
      setSearchValue("");
    }
  }, [open]);

  // Filtra os resultados usando useMemo para performance
  const filteredResults = useMemo(() => {
    if (!data || !searchValue) {
      return []; // Retorna vazio se não houver dados ou busca
    }

    const lowerCaseSearch = searchValue.toLowerCase();

    return data.filter((item) => {
      // Verifica se o nome (case-insensitive) inclui o termo de busca
      const nameMatch = item.name.toLowerCase().includes(lowerCaseSearch);
      // Verifica se o ID (convertido para string) inclui o termo de busca
      const idMatch = String(item.id).includes(lowerCaseSearch);

      return nameMatch || idMatch;
    });
  }, [data, searchValue]);

  // Função para lidar com o clique em um resultado
  const handleResultClick = (item: FieldItem) => {
    // Construa a URL de destino com base nos dados do item
    // Adapte esta lógica conforme a estrutura das suas rotas de detalhes
    if (item.categorySlug && item.subcategorySlug && item.id) {
      void navigate({
        to: "/catalog/$categorySlug/$subcategorySlug/$experimentId",
        params: {
          categorySlug: item.categorySlug,
          subcategorySlug: item.subcategorySlug,
          experimentId: item.id,
        },
      });
      onOpenChange(); // Fecha o dialog após a navegação
    } else {
      console.warn("Dados insuficientes para navegar para o item:", item);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="pb-2">Pesquisa Rápida</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Digite o id ou o nome do experimento..."
              className="w-full pl-9" // Padding para o ícone
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              // Foca automaticamente no input ao abrir
              ref={(inputRef) => inputRef?.focus()}
            />
          </div>
        </DialogHeader>
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {isLoading && (
            // Mostra skeletons enquanto os dados carregam
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {isError && (
            // Mostra mensagem de erro
            <p className="text-sm text-red-500 text-center">
              Erro ao carregar dados: {error?.message ?? "Erro desconhecido"}
            </p>
          )}

          {!isLoading && !isError && (
            <>
              {searchValue && filteredResults.length > 0 && (
                // Renderiza a lista de resultados filtrados
                <ul className="space-y-2">
                  {filteredResults.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleResultClick(item)}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent w-full text-left"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={item.image ?? undefined}
                            alt={item.name}
                          />
                          <AvatarFallback>
                            <Package className="h-4 w-4" />{" "}
                            {/* Ícone fallback */}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm truncate">{item.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ID: {item.id}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {searchValue && filteredResults.length === 0 && (
                // Mensagem de "nenhum resultado"
                <p className="text-sm text-muted-foreground text-center">
                  Nenhum resultado encontrado para "{searchValue}".
                </p>
              )}

              {!searchValue && (
                // Mensagem inicial
                <p className="text-sm text-muted-foreground text-center">
                  Comece a digitar para ver os resultados.
                </p>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
