import { Card, Layout } from "antd";
import { lazy, Suspense } from "react";

import darkLogo from "@/assets/img/dark.webp";
import { createFileRoute } from "@tanstack/react-router";

const LoginForm = lazy(() => import("@/components/pages/login/form-login"));

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const Title = (
    <div className="flex items-center justify-center">
      <span className="text-center text-2xl tracking-tighter">
        Entrar na sua conta
      </span>
    </div>
  );

  return (
    <Layout
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #42386a 0%, #0c0438 100%)",
        backgroundSize: "cover",
        height: "100dvh",
      }}
    >
      <div className="w-full m-auto max-w-96">
        <div className="flex items-center justify-center">
          <img width={200} height={64} src={darkLogo} alt="logo algetec" />
        </div>
        <Suspense fallback={null}>
          <Card
            title={Title}
            style={{
              margin: "1rem",
            }}
            styles={{
              header: { borderBottom: "none" },
            }}
          >
            <LoginForm />
          </Card>
        </Suspense>
      </div>
    </Layout>
  );
}
