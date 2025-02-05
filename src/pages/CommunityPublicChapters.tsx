import React, { useEffect, useState } from 'react'
import ChapterCardRework from '../components/chapter-card-rework'
import { supabase } from '../config/api';


const CommunityPublicChapters = () => {
  const [chapters, setChapters] = useState([]);
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

  }
  useEffect(() => {
    fetchPublicChapters()
  }, [])

  console.log(chapters)
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 m-2">
        {chapters.map((chapter: any) => (
          <ChapterCardRework image_url={chapter.chapter_barge} name={chapter.name} gene_seed={chapter.gene_seed} user_name={"Test"} key={chapter.chapter_id} />
        ))}
      </div>
    </>

  )
}

export default CommunityPublicChapters