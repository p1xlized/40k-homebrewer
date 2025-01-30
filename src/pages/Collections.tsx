import { useAuth } from "../lib/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import { useNavigate } from "@tanstack/react-router"
import { LogOut, CirclePlus } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import { useEffect, useState } from "react"
import { supabase } from "../config/api"

const Collections = () => {
    const navigate = useNavigate();
    const [geneSeed, setGeenSeed] = useState<string[] | null>(null);
    const { user } = useAuth();
    const currentUser = user

    return (

        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                <div className="flex justify-start items-center " >
                    <Avatar>
                        <AvatarImage src={currentUser.picture_url} className="h-8 w-8 rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="leading-7 [&:not(:first-child)]:ml-4">{user.username}</p>
                </div>
                <div className=" rounded-xl flex justify-center" >
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Documentation
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="rounded-xl flex justify-end">
                    <Sheet >
                        <SheetTrigger><Button className="mr-4"><CirclePlus /></Button></SheetTrigger>
                        <SheetContent side="bottom">
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <Button onClick={() => navigate({ to: '/' })} variant="outline"><LogOut /></Button>

                </div>
            </div>


            <div className="aspect-video rounded-xl bg-muted/50 h-full">
            </div>
        </div>
    )
}

export default Collections