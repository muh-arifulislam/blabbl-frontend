import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EllipsisVertical, Phone, Video } from "lucide-react";

type PropsType = {
  recipient: {
    name: string;
    picture: string;
  };
};

export function SiteHeader({ recipient }: PropsType) {
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
              src={
                recipient?.picture ??
                "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              }
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
        <button>
          <Phone />
        </button>
        <button>
          <Video />
        </button>
        <button>
          <EllipsisVertical />
        </button>
      </div>
    </header>
  );
}
