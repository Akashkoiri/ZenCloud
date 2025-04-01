import { AnimatedModal } from "@/components/animated-modal";
import { AppSidebar } from "@/components/app-sidebar";
import GlobalSearch from "@/components/global-search";
import { ModeToggle } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: props) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15 z-10 bg-transparent backdrop-blur-2xl">
          <div className="w-full flex justify-between items-center gap-2 px-4">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <div className="flex gap-2 z-20">
              <GlobalSearch />
              <AnimatedModal />
              <ModeToggle />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
