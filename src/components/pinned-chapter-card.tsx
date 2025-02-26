import { BackgroundGradient } from "../components/ui/background-gradient";
import { Plus, Trash2Icon } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from "../components/ui/drawer";
import { Button } from "./ui/button";
import { useAuth } from "../lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../config/api";

interface PinnedChapterProps {
    name?: string;
    chapter_barge?: string;
    chapter_id?: string;
}

export function PinnedChapter({ name, chapter_barge, chapter_id }: PinnedChapterProps) {
    const { user } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
    const currentUser = user;

    async function getChapters() {
        try {
            const { data, error } = await supabase
                .from("chapters")
                .select("*")
                .eq("user_id", currentUser.id)
                .order("created_at", { ascending: false });
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

    async function savePinned() {
        const { error } = await supabase
            .from("pinned")
            .insert({
                user_id: currentUser.id,
                chapter_id: selectedChapterId,
            })
            .select();
        if (error) {
            console.error("Error saving pinned chapter:", error);
        } else {
            console.log("Chapter pinned successfully");
        }
    }

    async function removePinned() {
        const { error } = await supabase.from("pinned").delete().eq("user_id", currentUser.id).eq("chapter_id", chapter_id);
        if (error) {
            console.error("Error removing pinned chapter:", error);
        } else {
            console.log("Chapter removed from pinned successfully");
        }
    }

    return (
        <div className="relative w-[200px] h-[250px]">
            <BackgroundGradient className="p-1 rounded-xl">
                <div className="relative">
                    {chapter_barge ? (
                        <div>
                            <img
                                src={chapter_barge}
                                alt="Chapter Barge"
                                height="180"
                                width="180"
                                className="object-contain rounded-xl min-h-[180px] min-w-[180px]"
                            />
                            <div
                                className="absolute top-2 right-2 z-10"
                                onClick={removePinned}
                                style={{ cursor: 'pointer' }}
                            >
                                <Button variant="destructive" size="icon">
                                    <Trash2Icon />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-1 rounded-xl h-[180px] w-[200px]" />
                    )}

                    {/* Remove Button */}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        {name ? (
                            <p className="text-white text-l font-bold">{name}</p>
                        ) : (
                            <p className="text-white text-l font-bold">
                                <Drawer>
                                    <DrawerTrigger>
                                        <Plus />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Select a Chapter</DrawerTitle>
                                            <div className="flex justify-around gap-4">
                                                {data.map((item) => (
                                                    <div
                                                        key={item.chapter_id}
                                                        className="flex flex-col items-center cursor-pointer"
                                                        onClick={() => setSelectedChapterId(item.chapter_id)}
                                                    >
                                                        <img
                                                            src={item.chapter_barge}
                                                            alt="Chapter Preview"
                                                            className={`w-32 h-32 object-cover rounded-full border-4 ${selectedChapterId === item.chapter_id
                                                                ? "border-white"
                                                                : ""
                                                                }`}
                                                        />
                                                        <p className="text-sm text-center">{item.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </DrawerHeader>
                                        <DrawerFooter>
                                            <Button onClick={savePinned}>Save</Button>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </p>
                        )}
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
}

