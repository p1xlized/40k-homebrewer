import { CommunitySideBar } from "../components/community-sidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";

const SideBarPage = ({ children }: { children: React.ReactNode }) => {
    return (
      <SidebarProvider>
        <CommunitySideBar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    );
  };
  
  export default SideBarPage;
  