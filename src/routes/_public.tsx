import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/app/store/authStore";

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      // Se o usuário JÁ ESTÁ autenticado, redireciona para o dashboard
      return redirect({
        to: "/catalog",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gradient-to-b dark:from-[#0d0d0d] dark:to-[#1e90ff33] from-[#bb243e33] to-[#ffffff] flex h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
}
