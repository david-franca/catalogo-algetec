/// <reference types="user-agent-data-types" />

import { useEffect } from "react";

import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useParams,
} from "@tanstack/react-router";
import { Grid, List, Search } from "lucide-react";

import { useAuthStore } from "@/app/store/authStore";
import { useModeView } from "@/app/store/modeViewStore";
import { AppAside } from "@/components/shared/app-aside";
import { AppBreadcrumb } from "@/components/shared/app-breadcrumb";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { CommandPalette } from "@/components/shared/command-palette";
import { AppLayoutSkeleton } from "@/components/skeletons/AppLayoutSkeleton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { icons } from "@/features/fields/hooks/sidebarIcons";
import { useGetSidebarFields } from "@/features/fields/hooks/useGetSidebarFields";
import { useDisclosure } from "@/hooks/useDisclosure";
import { cn, colorClasses, formatSlug } from "@/lib/utils";

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
  const { onToggle, isOpen } = useDisclosure();
  const { categorySlug } = useParams({ strict: false });
  const { pathname } = useLocation();
  const { setViewMode, viewMode } = useModeView();

  const categoryColorName = icons.find(
    (icon) =>
      icon.title.toLowerCase() === formatSlug(categorySlug ?? "").toLowerCase()
  )?.color as keyof typeof colorClasses | undefined;

  // Define as classes de cor a serem usadas, com um fallback para o padrão.
  const appliedClasses = categoryColorName
    ? colorClasses[categoryColorName]
    : { bg: "bg-muted", text: "text-muted-foreground" };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Verifica Ctrl+K ou Cmd+K
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); // Impede a ação padrão do navegador (ex: pesquisar)
        onToggle(); // Alterna o estado do dialog
      }
    };

    document.addEventListener("keydown", down);
    // Função de limpeza para remover o listener quando o componente desmontar
    return () => document.removeEventListener("keydown", down);
  }, [onToggle]);

  function getModifierKey() {
    if (navigator.userAgentData?.platform) {
      const platform = navigator.userAgentData.platform;
      const isMac = platform === "macOS";
      return isMac ? "⌘" : "Ctrl";
    }

    // Fallback para navegadores sem suporte (ex: Firefox, Safari)
    const ua = navigator.userAgent.toLowerCase();
    const isMac = /mac|iphone|ipad|ipod/.test(ua);
    return isMac ? "⌘" : "Ctrl";
  }

  const modifierKey = getModifierKey();

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
        <header
          className={cn(
            "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-20 bg-background border-b",
            appliedClasses,
            {
              [colorClasses.fuchsia]: pathname === "/catalog/news",
              [colorClasses.cyan]: pathname === "/catalog",
            }
          )}
        >
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumb />
            <div className="ml-auto flex items-center gap-2">
              <ButtonGroup className={cn(pathname === "/catalog" && "hidden")}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    viewMode === "grid" && "bg-accent text-accent-foreground"
                  )}
                  aria-label="Visualização em Grade"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    viewMode === "list" && "bg-accent text-accent-foreground"
                  )}
                  aria-label="Visualização em Lista"
                >
                  <List className="h-4 w-4" />
                </Button>
              </ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-sm text-muted-foreground"
                onClick={onToggle}
              >
                <Search className="h-4 w-4" /> {/* Ícone */}
                <span>Pesquisar...</span> {/* Placeholder */}
                <Kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">{modifierKey}</span>K
                </Kbd>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <CommandPalette open={isOpen} onOpenChange={onToggle} />
    </SidebarProvider>
  );
}
