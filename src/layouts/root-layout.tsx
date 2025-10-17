import { ConfigProvider, theme as antTheme, Watermark } from "antd";
import { lazy, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";

import darkLogo from "@/assets/img/dark.webp";
import lightLogo from "@/assets/img/light.webp";
import { useAuth, useTheme } from "@/hooks";
import { useTitle } from "@/hooks/useTitle";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";

const { darkAlgorithm, defaultAlgorithm } = antTheme;
const isDev = import.meta.env.MODE === "development";

const TanStackRouterDevtools = !isDev
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

export function RootLayout() {
  useTitle();
  const { token } = useAuth();
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const publicPaths = useMemo(
    () => ["/login", "/register", "/forgot-password"],
    []
  );

  useEffect(() => {
    if (token && publicPaths.includes(pathname)) {
      navigate({ to: "/dashboard" });
    }
  }, [token, navigate, pathname, publicPaths]);

  return (
    <>
      <Helmet>
        <link rel="preload" href={darkLogo} as="image" type="image/webp" />
        <link rel="preload" href={lightLogo} as="image" type="image/webp" />
      </Helmet>
      <ConfigProvider
        theme={{
          algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Outlet />
        <Watermark
          content={isDev ? ["algetec+", "Em desenvolvimento"] : undefined}
        ></Watermark>
        <TanStackRouterDevtools />
      </ConfigProvider>
    </>
  );
}
