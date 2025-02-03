import { useAuth } from "../lib/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useNavigate } from "@tanstack/react-router"
import { supabase } from "../config/api"
import { useEffect, useState } from "react"
import ChapterCard from "../components/chapters-folder"


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
                    <ChapterCard
                        key={chapter.id}
                        name={chapter.name}
                        image={"https://warhammer40000.com/wp-content/uploads/2023/07/WszHntPDLhdxl7VK.png"}
                        onClick={() => navigate({ to: `/chapters/${chapter.chapter_id}` })}
                    />
                ))}

            </div>
        </>
    )
}

export default Collections