import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, type AnyRouter } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

// Opções para a nossa função de render
interface RenderWithOptions {
  // Permite passar uma instância de roteador pré-configurada
  router?: AnyRouter;
  // Ou simplesmente a URL inicial
  route?: string;
}

export function renderWithProviders(
  // A função não precisa mais do `ui` se um roteador for fornecido
  ui: ReactElement | null,
  options: RenderWithOptions = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  // Usa o roteador passado ou renderiza o UI simples
  const componentToRender = options.router ? (
    <RouterProvider router={options.router} />
  ) : (
    ui
  );

  return render(
    <QueryClientProvider client={queryClient}>
      {componentToRender}
      <Toaster />
    </QueryClientProvider>
  );
}
