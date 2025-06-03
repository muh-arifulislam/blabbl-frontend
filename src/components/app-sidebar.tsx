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

import { NavDocuments } from "@/components/nav-documents";
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
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = React.useState<null | {
    name: string;
    avatar: string;
    email: string;
  }>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${
          import.meta.env.VITE_AUTH0_DOMAIN
        }/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const resData = await metadataResponse.json();

        setUserMetadata({
          name: resData?.name,
          email: resData?.email,
          avatar: resData?.picture,
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (user?.sub && isAuthenticated) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub]);

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
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Blabbl Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain />
        <NavDocuments />
      </SidebarContent>
      <SidebarFooter>
        {userMetadata && <NavUser user={userMetadata} />}
      </SidebarFooter>
    </Sidebar>
  );
}
