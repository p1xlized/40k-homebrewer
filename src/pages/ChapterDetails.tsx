import { useParams } from "@tanstack/react-router";
import { supabase } from "../config/api";
import { useEffect, useState } from "react";

interface Chapter {
    created_at: string;
    lore: string | null;
    name: string;
    founding: string | null;
    gene_seed: string | null;
    homeworld: string | null;
    doctrine: string | null;
    chapter_barge: string | null;
    codex_adherent: boolean | null;
    chapter_master: string;
    chapter_id: string;
    user_id: string;
    public: true | false;
}

const ChapterDetails = () => {
    const params = useParams({ from: '/chapters/$id' })
    const [chapter, setChapter] = useState<Chapter | null>(null);

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
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchChapterData();
        }
    }, [params.id]);

    if (!chapter) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex p-4">
                <div className="w-1/4 h-full bg-background rounded-xl p-4">
                    <img src={chapter.chapter_barge} alt="Chapter Barge" className="w-full h-full object-cover rounded-xl " />
                    <h4 className="text-2xl font-bold mt-2">{chapter.name}</h4>
                    <p>{chapter.lore}</p>

                </div>
                <div className="flex-1 h-full  aspect-video rounded-xl ">

                </div>
            </div>

        </div>
    );
};

export default ChapterDetails;
