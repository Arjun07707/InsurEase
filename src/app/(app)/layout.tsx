import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarWrapper />
        </Sidebar>
        <SidebarInset>
            <DashboardHeader />
            <main className="p-4 sm:p-6 lg:p-8 overflow-auto">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
