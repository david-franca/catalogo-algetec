import { FloatButton, Layout } from "antd";
import { lazy } from "react";

import { useAuth, useTheme } from "@/hooks";
import { cn } from "@/utils";
import { Navigate, Outlet } from "@tanstack/react-router";

const { Content } = Layout;

const Footer = lazy(() => import("@/components/footer"));
const Header = lazy(() => import("@/components/header"));
const Sidebar = lazy(() => import("@/components/sidebar/sider"));

export function DashboardLayout() {
  const { token } = useAuth();
  const { theme } = useTheme();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout hasSider>
        <Sidebar />
        <Content
          className={cn(
            "p-4",
            theme === "dark" ? "bg-slate-900" : "bg-sky-100"
          )}
        >
          <Outlet />
          <FloatButton.BackTop />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
