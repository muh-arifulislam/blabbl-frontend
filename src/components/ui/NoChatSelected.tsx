import { SidebarTrigger } from "./sidebar";

const NoChatSelected = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col">
      <div>
        <SidebarTrigger className="m-4" />
      </div>
      <div className="flex-1 w-full  flex items-center justify-center">
        <h2>No Chat Selected</h2>
      </div>
    </div>
  );
};

export default NoChatSelected;
