import { Menu, MenuProps } from "antd";
import { ElementType, Key, ReactNode, useMemo } from "react";

import { cn } from "@/utils";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { useTheme } from "../../hooks/useTheme";
import { useSidebarItems } from "./items";

type MenuItem = Required<MenuProps>["items"][number];

export function SidebarContent() {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const { theme } = useTheme();

  const sidebarItems = useSidebarItems();

  const getItem = (
    label: ReactNode,
    key: Key,
    Icon?: ElementType,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem =>
    ({
      key,
      icon: Icon && <Icon className="h-4 w-4" />,
      children,
      label,
      type,
    }) as MenuItem;

  const items = useMemo<MenuItem[]>(
    () =>
      sidebarItems.map((item) =>
        getItem(
          item.label,
          item.key,
          item.icon,
          item.children?.map((child) =>
            getItem(child.label, child.key, child.icon)
          )
        )
      ),
    [sidebarItems]
  );

  return (
    <Menu
      mode="inline"
      theme={theme === "dark" ? "dark" : "light"}
      className={cn(
        "text-base",
        theme === "dark" ? "bg-slate-950" : "bg-white"
      )}
      items={items}
      selectedKeys={[pathname.substring(1)]}
      onSelect={({ key }) => {
        if (key !== "external") {
          navigate({ to: `/${key}` });
        }
      }}
    />
  );
}
