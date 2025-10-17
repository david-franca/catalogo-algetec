import { Drawer, Layout } from "antd";
import { useSidebar } from "../../hooks/useSidebar";
import { useBreakpoint } from "../../hooks/useBreakPoints";
import { useTheme } from "../../hooks/useTheme";
import { SidebarContent } from "./content";
import { XIcon } from "lucide-react";
import { cn } from "@/utils";

export default function Sidebar() {
  const { isMinimized, toggle } = useSidebar();
  const { isAboveLg } = useBreakpoint("lg");
  const { theme } = useTheme();

  if (isAboveLg) {
    return (
      <Layout.Sider
        theme={theme === "dark" ? "dark" : "light"}
        trigger={null}
        collapsible
        collapsed={isMinimized}
        width="fit-content"
      >
        <SidebarContent />
      </Layout.Sider>
    );
  }
  return (
    <Drawer
      width="50%"
      classNames={{
        body: cn("p-0!", theme === "dark" ? "bg-slate-950" : "bg-white"),
        header: cn(theme === "dark" ? "bg-slate-950" : "bg-white"),
      }}
      placement="left"
      onClose={toggle}
      open={isMinimized}
      closeIcon={<></>}
      extra={
        <XIcon
          onClick={toggle}
          style={{
            cursor: "pointer",
            color: theme === "dark" ? "#FFF" : "#000",
          }}
        />
      }
    >
      <SidebarContent />
    </Drawer>
  );
}
