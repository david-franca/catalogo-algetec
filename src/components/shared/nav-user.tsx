import { ChevronsUpDown, LogOut, MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/app/providers/theme-provider";
import { useAuthStore } from "@/app/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { UserResponse } from "@/features/authentication/schemas";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function NavUser({ user }: { user: UserResponse | null }) {
  const { isMobile } = useSidebar();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    logout();
    void (await navigate({ to: "/", replace: true }));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.name) +
                    "&background=random&bold=true"
                  }
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg">A+</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name) +
                      "&background=random&bold=true"
                    }
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">A+</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => void navigate({ to: "/catalog/dashboard" })}
            >
              {t("navUser.dashboard")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {t("navUser.theme.title")}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => setTheme("light")}
                      className={theme === "light" ? "bg-accent" : ""}
                    >
                      {t("navUser.theme.light")}
                      <DropdownMenuShortcut>
                        <SunIcon className="size-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("dark")}
                      className={theme === "dark" ? "bg-accent" : ""}
                    >
                      {t("navUser.theme.dark")}
                      <DropdownMenuShortcut>
                        <MoonIcon className="size-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {t("navUser.language.title")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => changeLanguage("pt-BR")}
                    className={i18n.language === "pt-BR" ? "bg-accent" : ""}
                  >
                    {t("navUser.language.pt")}
                    <img
                      className="w-4 h-4 ml-auto"
                      loading="lazy"
                      decoding="async"
                      alt="Brazil"
                      src="http://purecatamphetamine.github.io/country-flag-icons/1x1/BR.svg"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => changeLanguage("en-US")}
                    className={i18n.language === "en-US" ? "bg-accent" : ""}
                  >
                    {t("navUser.language.en")}
                    <img
                      className="w-4 h-4 ml-auto"
                      loading="lazy"
                      decoding="async"
                      alt="United States"
                      src="http://purecatamphetamine.github.io/country-flag-icons/1x1/US.svg"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => changeLanguage("es-ES")}
                    className={i18n.language === "es-ES" ? "bg-accent" : ""}
                  >
                    {t("navUser.language.es")}
                    <img
                      className="w-4 h-4 ml-auto"
                      loading="lazy"
                      decoding="async"
                      alt="Spanish"
                      src="http://purecatamphetamine.github.io/country-flag-icons/1x1/ES.svg"
                    />
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              {t("navUser.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
