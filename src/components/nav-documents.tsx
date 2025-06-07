"use client";

import {
  // FolderIcon,
  MessageCircle,
  // MoreHorizontalIcon,
  // ShareIcon,
  // type LucideIcon,
} from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useFetchFriendsQuery } from "@/redux/features/user/userApi";

export function NavDocuments() {
  // const { isMobile } = useSidebar();

  const { data, isLoading, isFetching } = useFetchFriendsQuery(undefined);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="space-x-1">
        <MessageCircle absoluteStrokeWidth />
        <span>All Messages</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {data?.data?.map(
          (friend: {
            auth0_id: string;
            _id: string;
            picture: string;
            name: string;
          }) => (
            <SidebarMenuItem className="min-h-10" key={friend?._id}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={`/messages/${friend.auth0_id.split("|")[1]}`}
                  className="inline-block w-full h-full"
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      className="w-10 h-10 rounded-full overflow-hidden"
                      src={friend?.picture}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-medium">{friend?.name}</h2>
                        <p className="text-slate-600">10:30AM</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Typing...</p>
                        <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                          2
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
