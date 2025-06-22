import {
  ArrowUpCircleIcon,
  // BarChartIcon,
  // CameraIcon,
  // ClipboardListIcon,
  // DatabaseIcon,
  // FileCodeIcon,
  // FileIcon,
  // FileTextIcon,
  // FolderIcon,
  // HelpCircleIcon,
  // LayoutDashboardIcon,
  // ListIcon,
  // SearchIcon,
  // SettingsIcon,
  // UsersIcon,
} from "lucide-react";

import { NavUsers } from "@/components/nav-users";
import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="bg-white border-r-2 border-slate-100"
    >
      <SidebarHeader className="bg-white">
        <SidebarMenu className="bg-white">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Blabbl Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain />
        <NavUsers />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
