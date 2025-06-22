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
  useSidebar,
  // useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import {
  useFetchFriendsQuery,
  useFetchUserFriendRequestsQuery,
} from "@/redux/features/user/userApi";
import ReceiverSkeleton from "./Loader/ReceiverSkeleton";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import userAvatar from "@/assets/user.png";

export function NavUsers() {
  const { toggleSidebar, isMobile } = useSidebar();

  const { data, isLoading, isFetching } = useFetchFriendsQuery(undefined);

  const {
    data: requestedFriendsData,
    isLoading: isLoading1,
    isFetching: isFetching1,
  } = useFetchUserFriendRequestsQuery(undefined);

  const [friends, setFriends] = useState<[] | IUser[]>([]);

  useEffect(() => {
    if (!isLoading || !isFetching || !isLoading1 || !isFetching1) {
      const newArray = [
        ...(data?.data ?? []),
        ...(requestedFriendsData?.data?.sent ?? []),
        ...(requestedFriendsData?.data?.received ?? []),
      ];

      setFriends(newArray);
    }
  }, [data, requestedFriendsData]);

  if (isLoading || isFetching || isLoading1 || isFetching1) {
    return (
      <div className="space-y-3">
        <ReceiverSkeleton />
        <ReceiverSkeleton />
        <ReceiverSkeleton />
        <ReceiverSkeleton />
        <ReceiverSkeleton />
        <ReceiverSkeleton />
      </div>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="space-x-1">
        <MessageCircle absoluteStrokeWidth />
        <span>All Messages</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {friends.map(
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
                  onClick={() => {
                    if (isMobile) {
                      toggleSidebar();
                    }
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      className="w-10 h-10 rounded-full overflow-hidden"
                      src={friend?.picture ?? userAvatar}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-medium">{friend?.name}</h2>
                        <p className="text-slate-600">00:00AM</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Lorem ipsum dolor sit...</p>
                        <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                          0
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
