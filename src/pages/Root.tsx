import { Outlet, useRouter } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { CommunitySideBar } from '../components/community-sidebar';

export default function Root() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  // Define paths where only the Outlet should render
  const noSidebarPaths = ['/login', '/register', '/editor'];

  // Check if the current path is in the noSidebarPaths
  const isNoSidebarPath = noSidebarPaths.includes(currentPath);

  return (
    <SidebarProvider>
      {isNoSidebarPath ? (
        <Outlet />
      ) : (
        <>
          <CommunitySideBar />
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
        </>
      )}
    </SidebarProvider>
  );
}
