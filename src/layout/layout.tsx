import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <div className="h-screen flex flex-col w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
