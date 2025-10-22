import { useState } from "react";

import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

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

const colorClasses = {
  red: "hover:text-red-500! data-[active=true]:text-red-500 data-[state=open]:text-red-500 hover:bg-red-500/10",
  green:
    "hover:text-green-500! data-[active=true]:text-green-500 data-[state=open]:text-green-500 hover:bg-green-500/10",
  blue: "hover:text-blue-500! data-[active=true]:text-blue-500 data-[state=open]:text-blue-500 hover:bg-blue-500/10",
  yellow:
    "hover:text-yellow-500! data-[active=true]:text-yellow-500 data-[state=open]:text-yellow-500 hover:bg-yellow-500/10",
  purple:
    "hover:text-purple-500! data-[active=true]:text-purple-500 data-[state=open]:text-purple-500 hover:bg-purple-500/10",
  orange:
    "hover:text-orange-500! data-[active=true]:text-orange-500 data-[state=open]:text-orange-500 hover:bg-orange-500/10",
  pink: "hover:text-pink-500! data-[active=true]:text-pink-500 data-[state=open]:text-pink-500 hover:bg-pink-500/10",
  gray: "hover:text-gray-500! data-[active=true]:text-gray-500 data-[state=open]:text-gray-500 hover:bg-gray-500/10",
};

const subColorClasses = {
  red: "hover:text-red-500 data-[active=true]:text-red-500 hover:bg-red-500/10 data-[active=true]:bg-red-500/10",
  green:
    "hover:text-green-500 data-[active=true]:text-green-500 hover:bg-green-500/10 data-[active=true]:bg-green-500/10",
  blue: "hover:text-blue-500 data-[active=true]:text-blue-500 hover:bg-blue-500/10 data-[active=true]:bg-blue-500/10",
  yellow:
    "hover:text-yellow-500 data-[active=true]:text-yellow-500 hover:bg-yellow-500/10 data-[active=true]:bg-yellow-500/10",
  purple:
    "hover:text-purple-500 data-[active=true]:text-purple-500 hover:bg-purple-500/10 data-[active=true]:bg-purple-500/10",
  orange:
    "hover:text-orange-500 data-[active=true]:text-orange-500 hover:bg-orange-500/10 data-[active=true]:bg-orange-500/10",
  pink: "hover:text-pink-500 data-[active=true]:text-pink-500 hover:bg-pink-500/10 data-[active=true]:bg-pink-500/10",
  gray: "hover:text-gray-500 data-[active=true]:text-gray-500 hover:bg-gray-500/10 data-[active=true]:bg-gray-500/10",
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

  // Estado para controlar os itens abertos. Armazena os títulos dos itens.
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    // Inicializa o estado com os itens que devem estar abertos por padrão (ativos)
    const initiallyOpen = new Set<string>();
    items?.forEach((item) => {
      if (item.isActive) {
        initiallyOpen.add(item.title);
      }
    });
    return initiallyOpen;
  });

  // Função para alternar o estado de um item
  const toggleItem = (title: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const { t } = useTranslation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("navUser.categories")}</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible
            key={crypto.randomUUID()}
            open={openItems.has(item.title)}
            onOpenChange={() => toggleItem(item.title)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.isActive}
                  className={
                    item.color
                      ? colorClasses[item.color as keyof typeof colorClasses]
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
                            ? subColorClasses[
                                item.color as keyof typeof subColorClasses
                              ]
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
