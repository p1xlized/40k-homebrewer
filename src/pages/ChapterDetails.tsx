import { useNavigate, useParams } from "@tanstack/react-router";
import { supabase } from "../config/api";
import { useEffect, useState } from "react";
import Loader from "../assets/ressources/loader.gif";
import { Badge } from "../components/ui/badge";
import { CalendarRange, Dna, Eclipse,  } from "lucide-react";
import { Shield, Cross, Star, Cog,ShieldPlus, Book, Sword, Home } from "lucide-react";
import MarineCard from "../components/marine-card";
interface Chapter {
    created_at: string;
    lore: string | null;
    name: string;
    founding: string | null;
    gene_seed: string | null;
    homeworld: string | null;
    doctrine: string | null;
    chapter_barge: string | undefined;
    codex_adherent: boolean | null;
    chapter_master: string;
    chapter_id: string;
    user_id: string;
    public: true | false;
}

const ChapterDetails = () => {
    const params = useParams({ from: '/chapters/$id' })
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
const roles = [
    { name: "Chapter Master", icon: Shield },
    { name: "Chaplain", icon: Cross },
    { name: "Veteran", icon: Star },
    { name: "Techmarine", icon: Cog },
    { name: "Apothecary", icon: ShieldPlus },
    { name: "Librarian", icon: Book },
    { name: "Captain", icon: Sword },
    { name: "Base", icon: Home }
  ];
    async function fetchChapterData() {
        try {
            const { data, error } = await supabase
                .from("chapters")
                .select("*")
                .eq("chapter_id", params.id)
                .single();

            if (error) throw error;

            setChapter(data as Chapter);
        } catch (error) {
            console.error("Error fetching chapter:", error);
            setChapter(null);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or error occurs
        }
    }

    useEffect(() => {
        if (params.id) {
            setTimeout(() => {
                fetchChapterData();
            }, 4000); 
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <img src={Loader} alt="Loading..." />
            </div>
        );
    }

    if (!chapter) {
        return <div>Error loading chapter data.</div>;
    }

    return (

        <div className="flex p-4 h-screen">
            <div className="w-1/4 min-w-[40vh] h-full bg-background rounded-xl p-4">

                <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                    <div className="rounded-xl">
                        <img
                            src={chapter.chapter_barge}
                            alt="Chapter Barge"
                            className="w-48 h-48 object-cover rounded-full"
                        />
                    </div>
                    <div className="aspect-video rounded-xl" >
                        <h4 className="text-xl font-bold mt-2">{chapter.name}</h4>

                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
                    <Badge className="gap-1">
                        <CalendarRange size={16} />
                        {chapter.founding}
                    </Badge>
                    <Badge className="gap-1">
                        <Eclipse size={16} />
                        {chapter.homeworld}
                    </Badge>
                    <Badge className="gap-1">
                        <Dna size={16} />
                        {chapter.gene_seed}
                    </Badge>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Story
                    </span>
                </div>
                <p className="text-s mt-2">{chapter.lore}</p>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Fighting Doctrine
                    </span>
                </div>
            </div>
            <div className="flex-1 h-full w-[75%] aspect-video rounded-xl bg-background ml-4">

                <div className="grid gap-4 m-4 h-[96%] w-[97.5%] mr-4 grid-cols-2 md:grid-cols-4 auto-rows-[1fr]">
                    {roles.map((role, index) => (
                        <MarineCard key={index} role={role.name} icon={<role.icon size={16} />} />
                    ))}
                </div>
            </div>


        </div>

    );
};

export default ChapterDetails;
