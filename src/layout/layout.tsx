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
              <main className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                {/* Render Messages Here */}
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
                </div>
                <div className="bg-white p-3 rounded shadow max-w-sm">
                  Hi there!
                </div>
                <div className="bg-blue-100 p-3 rounded shadow max-w-sm ml-auto">
                  Hey!
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
