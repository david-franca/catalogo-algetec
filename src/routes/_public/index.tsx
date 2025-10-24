import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/features/authentication/components/login-form";

export const Route = createFileRoute("/_public/")({
  component: Index,
  head: () => ({
    meta: [{ title: "Login | Catálogo de Produtos" }],
  }),
});

function Index() {
  return <LoginForm />;
}
