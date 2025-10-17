import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [{ title: "Catálogo de Produtos" }],
  }),
});
