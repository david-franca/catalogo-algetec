import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/app/store/authStore";
import { AppAside } from "@/components/shared/app-aside";
import { AppBreadcrumb } from "@/components/shared/app-breadcrumb";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { AppLayoutSkeleton } from "@/components/skeletons/AppLayoutSkeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetSidebarFields } from "@/features/fields/hooks/useGetSidebarFields";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    // Acessa o estado diretamente. Graças à nossa inicialização, ele já estará correto.
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      // Se não estiver autenticado, redireciona para o login
      return redirect({
        to: "/",
        // Guarda a rota que o usuário tentou acessar para redirecioná-lo de volta após o login
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isLoading, isError, error } = useGetSidebarFields();

  if (isLoading) {
    return <AppLayoutSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          Erro ao carregar a navegação principal:{" "}
          {error?.message ?? "Erro desconhecido"}
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <AppAside />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-20 bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card>
            <Outlet />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
