import * as React from "react";

import { useAuthStore } from "@/app/store/authStore";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetSidebarFields } from "@/features/fields/hooks/useGetSidebarFields";

import { NavLogo } from "./nav-logo";
import { NavMain } from "./nav-main";
import { NavSkeleton } from "./nav-skeleton";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isPending } = useGetSidebarFields();
  const { user } = useAuthStore();

  if (isPending) {
    return <NavSkeleton {...props} />;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
