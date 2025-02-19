import React, { useEffect, useState } from 'react'
import ChapterCardRework from '../components/chapter-card-rework'
import { supabase } from '../config/api';
import { useNavigate } from '@tanstack/react-router';
import Loader from "../assets/ressources/loader.gif";
import { Label } from "@/components/ui/field"
import { Tag, TagGroup, TagList } from "@/components/ui/tag-group"


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
        .select(`
          *,
          user:profiles(username, picture_url)`)
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
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl "></div>
        <div className="rounded-xl p-4 flex align-center justify-center">
          <TagGroup className="space-y-1" selectionMode="multiple">
            <TagList>
              <Tag>News</Tag>
              <Tag>Travel</Tag>
              <Tag>Gaming</Tag>
              <Tag>Shopping</Tag>
            </TagList>
          </TagGroup>
        </div>
        <div className="rounded-xl "></div>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 m-2">
        {chapters.map((chapter: any) => (
          <ChapterCardRework
            image_url={chapter.chapter_barge}
            name={chapter.name}
            gene_seed={chapter.gene_seed}
            user_name={chapter.user.username}
            picture_url={chapter.user.picture_url}
            key={chapter.chapter_id}
            onClick={() => navigate({ to: `/app/chapters/${chapter.chapter_id}` })} />
        ))}
      </div>
    </>

  )
}

export default CommunityPublicChapters