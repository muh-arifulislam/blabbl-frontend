import { Skeleton } from "../ui/skeleton";

const SideFooterLoader = () => {
  return (
    <div className="p-2 rounded-lg flex items-center justify-between bg-slate-50">
      <div className="flex items-center gap-2">
        <div>
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
        <div className="">
          <Skeleton className="w-20 h-3 mb-2" />
          <Skeleton className="w-30 h-2" />
        </div>
      </div>
      <div>
        <Skeleton className="w-2 h-8" />
      </div>
    </div>
  );
};

export default SideFooterLoader;
