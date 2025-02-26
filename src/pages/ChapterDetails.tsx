import { useNavigate, useParams } from "@tanstack/react-router";
import { supabase } from "../config/api";
import { useEffect, useState } from "react";
import Loader from "../assets/ressources/loader.gif";
import { Badge } from "../components/ui/badge";
import { CalendarRange, Dna, Eclipse, Edit2, } from "lucide-react";
import { Shield, Cross, Star, Cog, ShieldPlus, Book, Sword, Home } from "lucide-react";
import MarineCard from "../components/marine-card";
import DetailsInfo from "../components/datails-info";
import DetailsEdit from "../components/datails-edit";
import { Button } from "../components/ui/button";
import { useAuth } from "../lib/contexts/AuthContext";
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
    const params = useParams({ from: '/app/chapters/$id' })
    const { user } = useAuth();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate()
    const roles = [
        { name: "Base Model", icon: Home, classfied: false },
        { name: "Chapter Master", icon: Shield, classfied: true },
        { name: "Chaplain", icon: Cross, classfied: true  },
        { name: "Veteran", icon: Star, classfied: true  },
        { name: "Techmarine", icon: Cog, classfied: true  },
        { name: "Apothecary", icon: ShieldPlus, classfied: true  },
        { name: "Librarian", icon: Book, classfied: true  },
        { name: "Captain", icon: Sword, classfied: true  },
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
            setLoading(false);
        }
    }

    useEffect(() => {
        if (params.id) {
            setTimeout(() => {
                fetchChapterData();
            }, 3000);
        }
    }, [params.id]);
    console.log(chapter)
    console.log(user)

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
            <div className="relative w-1/4 min-w-[40vh] h-full bg-background rounded-xl p-4">
               {chapter.user_id === user.id && (    
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setEditMode(!editMode)}
                >
                    <Edit2 />
                </Button>
               )}

                {/* Content below the button */}
                {editMode ? (
                    <DetailsEdit
                        chapterBarge={chapter.chapter_barge}
                        founding={chapter.founding}
                        homeworld={chapter.homeworld}
                        geneSeed={chapter.gene_seed}
                        name={chapter.name}
                        lore={chapter.lore}
                        chapter_id={params.id}
                    />
                ) : (
                    <DetailsInfo
                        chapterBarge={chapter.chapter_barge}
                        founding={chapter.founding}
                        homeworld={chapter.homeworld}
                        geneSeed={chapter.gene_seed}
                        name={chapter.name}
                        lore={chapter.lore}
                    />
                )}
            </div>

            <div className="flex-1 h-full w-[75%] aspect-video rounded-xl bg-background ml-4">

                <div className="grid gap-4 m-4 h-[96%] w-[97.5%] mr-4 grid-cols-2 md:grid-cols-4 auto-rows-[1fr]">
                    {roles.map((role, index) => (
                        <MarineCard key={index} role={role.name} icon={<role.icon size={16} />} onClick={() => navigate({ to: `/app/editor/${params.id}` })} classified={role.classfied} />
                    ))}
                </div>
            </div>


        </div>

    );
};

export default ChapterDetails;
