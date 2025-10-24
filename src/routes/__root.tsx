import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HeadContent />
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
  </ThemeProvider>
);

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  head: () => ({
    meta: [{ title: "Catálogo de Produtos" }],
  }),
});
