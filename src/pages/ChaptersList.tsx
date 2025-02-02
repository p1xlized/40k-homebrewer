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
        <>
            <div className="grid grid-cols-4 gap-4 p-4 m-2">
                {data.map((chapter: any) => (
                    <StackedCollectionCard
                        key={chapter.id}
                        name={chapter.name}
                        geneSeed={chapter.gene_seed}
                    />
                ))}

            </div>
        </>
    )
}

export default Collections