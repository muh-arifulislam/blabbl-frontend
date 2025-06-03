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
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavDocuments() {
  // const { isMobile } = useSidebar();

  const { user, isLoading } = useAuth0();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `https://blabbl.onrender.com/api/users/${user.sub}/friends`
        );
        if (!response.ok) throw new Error("Failed to fetch friends");
        const data = await response.json();
        // You can set state here if needed, e.g. setFriends(friends);
        // console.log("Fetched friends:", data.data);

        setFriends(data.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
