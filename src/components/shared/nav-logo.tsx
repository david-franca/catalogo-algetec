"use client";

import { Link } from "@tanstack/react-router";

import dark from "@/assets/dark.png";
import light from "@/assets/light.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/useTheme";

export function NavLogo() {
  const { state } = useSidebar();
  const { theme } = useTheme();

  const logo = theme === "light" ? dark : light;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link
            to="/catalog"
            className="text-sidebar-primary-foreground flex items-center justify-center rounded-lg"
          >
            {state === "collapsed" && (
              <img
                src="https://plataformaa.com.br/hubfs/favicon%20Plataforma%20A.png"
                alt="Logo Algetec"
                className="size-8 shrink-0"
              />
            )}
            {state === "expanded" && (
              <img src={logo} alt="Logo Algetec" className="px-12" />
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
