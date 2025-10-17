import { LoginForm } from "@/components/login-form";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

export const setupRouter = () => {
  // --- Setup do Router ---
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: LoginForm,
  });
  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/catalog",
    component: () => <div>Página do Dashboard</div>,
  });
  const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
};
