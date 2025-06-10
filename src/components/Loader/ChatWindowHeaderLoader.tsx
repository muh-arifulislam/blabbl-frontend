import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const ChatWindowHeaderLoader = () => {
  return (
    <div className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-white">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="-ml-1">
          <Skeleton className="w-4 h-4 rounded-sm" />
        </div>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex gap-x-2 items-center">
          <div className="relative">
            <Skeleton className="w-12 h-12 rounded-full overflow-hidden" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-30 h-4 rounded-sm" />
            <Skeleton className="w-16 h-4 rounded-sm" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 pr-6">
        <Skeleton className="w-2 h-8 rounded-sm" />
      </div>
    </div>
  );
};

export default ChatWindowHeaderLoader;
