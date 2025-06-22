import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useUnfriendMutation } from "@/redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import useRequestHelper from "@/hooks/useRequestHelper";

import userAvatar from "@/assets/user.png";

type PropsType = {
  recipient: {
    name: string;
    picture: string;
    _id: string;
    auth0_id: string;
  };
};

export function SiteHeader({ recipient }: PropsType) {
  const navigate = useNavigate();

  const [unfriend] = useUnfriendMutation();

  const handleUnfriend = async (friendAuth0Id: string) => {
    try {
      const res = await unfriend(friendAuth0Id);

      if ("data" in res && res.data?.success) {
        navigate("/messages");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { friendsIds } = useRequestHelper();

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-white">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex gap-x-2 items-center">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full overflow-hidden"
              src={recipient?.picture ?? userAvatar}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
          <div>
            <h2 className="font-medium">{recipient?.name}</h2>
            <p className="text-xs">Online</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={!friendsIds.includes(recipient._id)}
              onClick={() => handleUnfriend(recipient.auth0_id)}
            >
              Unfriend
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
