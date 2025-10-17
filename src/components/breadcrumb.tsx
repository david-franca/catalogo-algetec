import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useMemo } from "react";

import { Link, useLocation } from "@tanstack/react-router";
import { handlePageName } from "@/utils/handlePageName";

function itemRender(
  currentRoute: ItemType,
  _: unknown,
  items: ItemType[],
  paths: string[]
) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
  );
}

export function Breadcrumb() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const items = useMemo<BreadcrumbProps["items"]>(
    () =>
      pathname
        .split("/")
        .filter(Boolean)
        .map((item) => ({
          title: handlePageName(item),
          path: `/${item}`,
        }))
        .filter((item) => isNaN(Number(item.title))),
    [pathname]
  );

  return <AntdBreadcrumb items={items} itemRender={itemRender} />;
}
