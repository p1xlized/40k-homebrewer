import { useAuth } from "../lib/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import { useNavigate } from "@tanstack/react-router"
import { LogOut, CirclePlus } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import { ChapterForm } from "../components/chapter-form"
import { supabase } from "../config/api"
import { useEffect, useState } from "react"
import { StackedCollectionCard } from "../components/chapters-card"


const Collections = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [data, setData] = useState<any>([]);
    const currentUser = user
    console.log(currentUser)

    async function getChapters() {
        try {
            const { data, error } = await supabase
                .from("chapters")
                .select("*")
                .eq("user_id", currentUser.id)
                .order("created_at", { ascending: false })

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Error fetching chapters:", error);
            return [];
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

    useEffect(() => {
        async function fetchChapters() {
            if (!currentUser || !currentUser.id) return;
            try {
                const chapters = await getChapters();
                setData(chapters);
            } catch (error) {
                console.error("Error fetching chapters:", error);
            }
        }

        fetchChapters();
    }, [currentUser]);
    console.log(data)
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
                                <SheetTitle>Create a custom chapter</SheetTitle>
                                <SheetDescription>
                                    <ChapterForm handleSaveButton={createChapter} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <Button onClick={() => navigate({ to: '/' })} variant="outline"><LogOut /></Button>

                </div>
            </div>


            <div className="aspect-video rounded-xl bg-muted/50 h-full">
                <div className="grid grid-cols-4 gap-4 p-4 m-2">
                {data.map((chapter: any) => (
                    <StackedCollectionCard
                        key={chapter.id}
                        name={chapter.name}
                        geneSeed={chapter.gene_seed}
                    />
                ))}

                </div>

            </div>
        </div>
    )
}

export default Collections