import { Outlet, useRouter } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { CommunitySideBar } from '../components/community-sidebar';

export default function Root() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const noSidebarPaths = ['/login', '/register', '/editor', '/collections'];
  const isNoSidebarPath = noSidebarPaths.includes(currentPath);

  return (
    <>
      {isNoSidebarPath ? (

        <Outlet />
      ) : (
        <SidebarProvider>
          <CommunitySideBar />
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
