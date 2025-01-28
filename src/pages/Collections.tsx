import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import { useNavigate } from "@tanstack/react-router"
import { LogOut } from "lucide-react"
const Collections = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                <div className=" rounded-xl" >
                    
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className="h-8 w-8 rounded-full"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

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
                    <Button onClick={()=> navigate({ to: '/' })} variant="outline"><LogOut /></Button>

                </div>
            </div>


            <div className="aspect-video rounded-xl bg-muted/50 h-full">
            </div>
        </div>
    )
}

export default Collections