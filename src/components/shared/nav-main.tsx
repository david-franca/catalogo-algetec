import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useParams } from "@tanstack/react-router";

const colorClasses = {
  red: "hover:text-red-500 data-[active=true]:text-red-500 data-[state=open]:text-red-500",
  green:
    "hover:text-green-500 data-[active=true]:text-green-500 data-[state=open]:text-green-500",
  blue: "hover:text-blue-500 data-[active=true]:text-blue-500 data-[state=open]:text-blue-500",
  yellow:
    "hover:text-yellow-500 data-[active=true]:text-yellow-500 data-[state=open]:text-yellow-500",
  purple:
    "hover:text-purple-500 data-[active=true]:text-purple-500 data-[state=open]:text-purple-500",
  orange:
    "hover:text-orange-500 data-[active=true]:text-orange-500 data-[state=open]:text-orange-500",
  pink: "hover:text-pink-500 data-[active=true]:text-pink-500 data-[state=open]:text-pink-500",
  gray: "hover:text-gray-500 data-[active=true]:text-gray-500 data-[state=open]:text-gray-500",
};

export function NavMain({
  items,
}: {
  items:
    | {
        title: string;
        icon?: LucideIcon;
        color?: string;
        isActive?: boolean;
        items?: {
          title: string;
          slug: string;
          category: string;
        }[];
      }[]
    | undefined;
}) {
  const { subcategorySlug } = useParams({
    select: (params) => ({ subcategorySlug: params.subcategorySlug }),
    strict: false,
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Categorias</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.isActive}
                  className={
                    item.color
                      ? `${colorClasses[item.color as keyof typeof colorClasses]} data-[active=true]:hover:text-${item.color}-500 data-[state=open]:hover:text-${item.color}-500`
                      : ""
                  }
                >
                  {item.icon && <item.icon />}
                  <span className="truncate">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={subItem.slug === subcategorySlug}
                        className={
                          item.color
                            ? `data-[active=true]:text-${item.color}-500`
                            : ""
                        }
                      >
                        <Link
                          to="/catalog/$categorySlug/$subcategorySlug"
                          params={{
                            categorySlug: subItem.category,
                            subcategorySlug: subItem.slug,
                          }}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
