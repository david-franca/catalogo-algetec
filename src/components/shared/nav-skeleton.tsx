import { NavLogo } from "./nav-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
  SidebarRail,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";

export function NavSkeleton({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="flex flex-col gap-1">
          {Array.from({ length: 5 }).map(() => (
            <SidebarMenuSkeleton key={crypto.randomUUID()} showIcon />
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 shrink-0 rounded-lg" />
          <div className="flex w-full flex-col gap-1.5 group-data-[collapsible=icon]:hidden">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
