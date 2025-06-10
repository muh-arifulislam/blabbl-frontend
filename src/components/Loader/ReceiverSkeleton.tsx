import { Skeleton } from "../ui/skeleton";

const ReceiverSkeleton = () => {
  return (
    <div className="min-h-10 flex items-center gap-x-2 px-2">
      <div>
        <Skeleton className="w-10 h-10 rounded-full overflow-hidden" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="w-30 h-4 rounded-sm" />
          <Skeleton className="w-12 h-4 rounded-sm" />
        </div>
        <div className="flex items-center justify-between gap-y-2">
          <Skeleton className="w-10 h-4 rounded-sm" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ReceiverSkeleton;
