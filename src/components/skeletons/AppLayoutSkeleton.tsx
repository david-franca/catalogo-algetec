import { Skeleton } from "@/components/ui/skeleton";

import { NavSkeleton } from "../shared/nav-skeleton";
import { SidebarProvider } from "../ui/sidebar";

export function AppLayoutSkeleton() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Skeleton para a Sidebar */}
        <NavSkeleton />

        {/* Skeleton para o Conteúdo Principal */}
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          {/* Skeleton para o Header/Breadcrumb */}
          <header className="mb-4 h-14">
            <Skeleton className="h-6 w-1/3" />
          </header>
          {/* Skeleton para o conteúdo da página */}
          <main className="flex-1 space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
