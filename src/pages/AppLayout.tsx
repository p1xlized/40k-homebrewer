// ChaptersLayout.tsx
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../components/ui/navigation-menu';
import { useAuth } from '../lib/contexts/AuthContext';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { ChapterForm } from '../components/chapter-form';
import { Button } from '../components/ui/button';
import { CirclePlus, Settings } from 'lucide-react';
import { supabase } from '../config/api';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

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
                        <AvatarImage src={user.picture_url ? user.picture_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"} className="h-8 w-8 rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="leading-7 [&:not(:first-child)]:ml-4">{user.username}</p>
                </div>
                <div className=" rounded-xl flex justify-center" >
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => navigate({ to: `/app/chapters` })}>
                                    My Creation
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => navigate({ to: `/app` })}>
                                    All Creations
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Settings /></Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                            <DialogHeader className="contents space-y-0 text-left">
                                <DialogTitle className="border-b border-border px-6 py-4 text-base">
                                    Settings
                                </DialogTitle>
                            </DialogHeader>
                            <div className="p-2">
                                <Button variant="outline" className="w-full mt-2">Change theme</Button>
                                <Button variant="outline" className="w-full mt-2">Change theme</Button>

                            </div>
                            <DialogFooter className="border-t border-border px-6 py-4">
                                <Button variant="destructive" className="w-full" onClick={handleLogout} >LogOut</Button>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

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
