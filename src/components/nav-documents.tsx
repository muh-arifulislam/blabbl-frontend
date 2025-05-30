"use client";

import {
  FolderIcon,
  MessageCircle,
  MoreHorizontalIcon,
  ShareIcon,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="space-x-1">
        <MessageCircle absoluteStrokeWidth />
        <span>All Messages</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem className="min-h-10" key={item.name}>
            <SidebarMenuButton asChild>
              <a href={"#"} className="inline-block w-full h-full">
                <div className="flex items-center gap-x-2">
                  <img
                    className="w-10 h-10 rounded-full overflow-hidden"
                    src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="font-medium">Grace Miller</h2>
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
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
