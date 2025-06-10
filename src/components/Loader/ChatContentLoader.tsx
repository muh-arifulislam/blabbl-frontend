import { Skeleton } from "../ui/skeleton";

const ChatContentLoader = () => {
  return (
    <>
      <div className="flex justify-end gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-end gap-x-4">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-30 h-4" />
          </div>
          <div className="bg-white max-w-xl p-3 rounded-b-md rounded-l-md shadow">
            <Skeleton className="w-30 h-4" />
          </div>
        </div>
        <div>
          <Skeleton className="w-8 h-8 rounded-full overflow-hidden" />
        </div>
      </div>
      <div className="flex gap-x-4 items-start">
        <div>
          <Skeleton className="w-8 h-8 rounded-full overflow-hidden" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-x-4">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-30 h-4" />
          </div>
          <div className="bg-white p-3 rounded-b-md rounded-r-md shadow max-w-xl">
            <Skeleton className="w-30 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-end gap-x-4">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-30 h-4" />
          </div>
          <div className="bg-white max-w-xl p-3 rounded-b-md rounded-l-md shadow">
            <Skeleton className="w-30 h-4" />
          </div>
        </div>
        <div>
          <Skeleton className="w-8 h-8 rounded-full overflow-hidden" />
        </div>
      </div>
    </>
  );
};

export default ChatContentLoader;
