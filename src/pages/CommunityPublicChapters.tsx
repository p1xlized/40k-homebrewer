import React, { useEffect, useState } from 'react'
import ChapterCardRework from '../components/chapter-card-rework'
import { supabase } from '../config/api';
import { useNavigate } from '@tanstack/react-router';
import Loader from "../assets/ressources/loader.gif";

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

const CommunityPublicChapters = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  async function fetchPublicChapters() {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("public", true)
        .order("created_at", { ascending: false })

      if (error) throw error;

      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      return [];
    }
    finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    setTimeout(() => {
      fetchPublicChapters()
    }, 3000);
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <img src={Loader} alt="Loading..." />
      </div>
    );
  }

  if (!chapters) {
    return <div>Error loading chapter data.</div>;
  }

  console.log(chapters)
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 m-2">
        {chapters.map((chapter: any) => (
          <ChapterCardRework
            image_url={chapter.chapter_barge}
            name={chapter.name}
            gene_seed={chapter.gene_seed}
            user_name={"Test"}
            key={chapter.chapter_id}
            onClick={() => navigate({ to: `/app/chapters/${chapter.chapter_id}` })} />
        ))}
      </div>
    </>

  )
}

export default CommunityPublicChapters