// ChaptersLayout.tsx
import { Outlet, useNavigate } from '@tanstack/react-router';
import ProtectedRoute from '../router/Protected';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../components/ui/navigation-menu';
import { useAuth } from '../lib/contexts/AuthContext';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { ChapterForm } from '../components/chapter-form';
import { Button } from '../components/ui/button';
import { CirclePlus, LogOut, Settings } from 'lucide-react';
import { supabase } from '../config/api';

const AppLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const currentUser = user

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut()
        logout()
        navigate({ to: '/login' })
        if (error) throw error
      } catch (error) {
        console.log(error)
      }
  
    }

    async function createChapter(name: string, gene_seed: string) {
        if (!currentUser || !currentUser.id) {
            console.error("User not authenticated or missing ID.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("chapters")
                .insert([{ name, gene_seed, user_id: currentUser.id }])

            if (error) throw error;

            console.log("Chapter created:", data);
        } catch (error) {
            console.error("Error creating chapter:", error);
        }
    }
    
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                <div className="flex justify-start items-center " >
                    <Avatar onClick={() => navigate({ to: `/app/profile/${currentUser.id}` })}>
                        <AvatarImage src={user.picture_url} className="h-8 w-8 rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="leading-7 [&:not(:first-child)]:ml-4">{user.username}</p>
                </div>
                <div className=" rounded-xl flex justify-center" >
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => navigate({ to: `/app/chapters` })}>
                                    Manufactorum
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => navigate({ to: `/app` })}>
                                    Inquisition
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="rounded-xl flex justify-end items-center">
                    <Sheet >
                        <SheetTrigger><Button variant="secondary" className="mr-4"><CirclePlus /></Button></SheetTrigger>
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>Create a custom chapter</SheetTitle>
                                <SheetDescription>
                                    <ChapterForm handleSaveButton={createChapter} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <Button variant="secondary" onClick={handleLogout} ><Settings /></Button>

                </div>
            </div>


            <div className="aspect-video rounded-xl bg-muted/50
             h-full">
                <Outlet />

            </div>
        </div>
    )

};

export default AppLayout;
