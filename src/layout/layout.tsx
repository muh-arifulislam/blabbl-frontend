import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { SiteHeader } from "@/components/site-header";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Paperclip } from "lucide-react";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <div className="h-screen flex flex-col w-full">
        {/* Header */}
        <SiteHeader />

        {/* Main Content - flex grow and scroll */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar (if needed) */}
          <SidebarInset className="flex flex-col w-full">
            {/* Main Chat Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Content - scrollable */}
              <main className="flex-1 overflow-y-auto p-4 space-y-8 bg-gray-50">
                {/* Render Messages Here */}

                <div className="flex gap-x-4 items-start">
                  <div>
                    <img
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-x-4">
                      <h2 className="font-medium text-slate-800">
                        Grace Miller
                      </h2>
                      <p className="text-xs text-slate-900">10:30AM</p>
                    </div>
                    <div className="bg-white p-3 rounded-b-md rounded-r-md shadow max-w-xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda commodi eos consequatur velit! Saepe nobis
                      soluta, aliquid quod totam facere?
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-end gap-x-4">
                      <h2 className="font-medium">Grace Miller</h2>
                      <p className="text-xs text-slate-800">10:20AM</p>
                    </div>
                    <div className="bg-blue-400 max-w-xl p-3 text-white rounded-b-md rounded-l-md">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eveniet ducimus commodi quam dicta ex dolor
                        doloremque necessitatibus dolores ipsam fuga!
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 items-start">
                  <div>
                    <img
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-x-4">
                      <h2 className="font-medium text-slate-800">
                        Grace Miller
                      </h2>
                      <p className="text-xs text-slate-900">10:30AM</p>
                    </div>
                    <div className="bg-white p-3 rounded-b-md rounded-r-md shadow max-w-xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda commodi eos consequatur velit! Saepe nobis
                      soluta, aliquid quod totam facere?
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-end gap-x-4">
                      <h2 className="font-medium">Grace Miller</h2>
                      <p className="text-xs text-slate-800">10:20AM</p>
                    </div>
                    <div className="bg-blue-400 max-w-xl p-3 text-white rounded-b-md rounded-l-md">
                      <p>Typing...</p>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    />
                  </div>
                </div>

                {/* ...more messages... */}
              </main>

              {/* Bottom Bar - fixed at bottom */}
              <div className="h-16 border-t border-gray-200 flex items-center px-4 bg-white gap-2 shrink-0">
                <Input placeholder="Type a message..." className="flex-1" />
                <Mic absoluteStrokeWidth />
                <Paperclip absoluteStrokeWidth />
                <Button>Send</Button>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
