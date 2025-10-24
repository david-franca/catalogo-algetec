import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Componente de esqueleto para a página de detalhes de um experimento.
 * Exibe uma representação visual do layout da página enquanto os dados estão sendo carregados.
 */
export function ExperimentSkeleton() {
  return (
    <CardContent>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {/* Coluna da Esquerda: Imagem e Detalhes */}
            <div className="flex flex-col gap-4 items-start">
              {/* Imagem */}
              <Skeleton className="h-[400px] w-full rounded-2xl" />

              {/* Botões */}
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>

              {/* Detalhes (Idiomas, Plataformas, etc.) */}
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-52" />
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Descrição */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <br />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <br />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}
