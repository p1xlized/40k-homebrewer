import { useEffect, useState } from 'react'
import ChapterCardRework from '../components/chapter-card-rework'
import { supabase } from '../config/api';
import { useNavigate } from '@tanstack/react-router';
import Loader from "../assets/ressources/loader.gif";
import { Tag, TagGroup, TagList } from "../components/ui/tag-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Separator } from '../components/ui/separator';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';


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
  const [geneSeed, setGeneSeed] = useState<string[]>([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  async function fetchGeneSeed() {
    try {
      const { data, error } = await supabase.rpc("get_gene_seed_enum");

      if (error) console.error("Error:", error);
      setGeneSeed(data);
    }
    catch (error) {
      console.error("Error fetching gene seed:", error);
    }
  }
  async function fetchPublicChapters() {
    try {
      const response = await supabase
        .from("chapters")
        .select(`
          *,
          user:profiles(username, picture_url)`)
        .eq("public", true)
        .order("created_at", { ascending: false });

      const { data, error } = response;

      if (error) throw error; // Handle any errors

      let filteredData = data;

      if (selectedItem != null) {
        // Filter chapters by selected gene seed
        filteredData = data.filter(chapter => chapter.gene_seed === selectedItem);
      }

      setChapters(filteredData);

    } catch (error) {
      console.error("Error fetching chapters:", error);
      setChapters([]); // Set empty chapters in case of error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchPublicChapters()
      fetchGeneSeed()
    }, 3000);
  }, [selectedItem])

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

  console.log(geneSeed)
  console.log(selectedItem)

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-2 mx-4 p-1">
        <div className="rounded-xl ">
        </div>
        <div className="rounded-xl flex align-center justify-center">
          <TagGroup className="flex p-2 space-y-1 align-center justify-center" selectionMode="multiple">
            <TagList>
              <Tag>Space Marine</Tag>
              <Tag>Chaos Marines</Tag>
              <Tag>Eldars</Tag>
              <Tag>Tyranids</Tag>
              <Tag>Tau</Tag>
              <Tag>Necrons</Tag>
            </TagList>
          </TagGroup>
        </div>
        <div className="rounded-xl ">
          <Select value={selectedItem } onValueChange={setSelectedItem}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Gene Seed" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gene Seed</SelectLabel>
                <SelectItem value={null}>All</SelectItem>
                {geneSeed.map((seed) => (
                  <SelectItem key={seed} value={seed}>
                    {seed}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>
      <div className="mx-4">

        <Separator />
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 m-2 justify-items-center">

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
