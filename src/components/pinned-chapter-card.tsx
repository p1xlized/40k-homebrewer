import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Plus } from "lucide-react";

interface PinnedChapterProps {
    name?: string;
    chapter_barge?: string;
}
export function PinnedChapter({ name, chapter_barge }: PinnedChapterProps
) {
    return (
        <div className="relative w-[200px] h-[250px]">
            <BackgroundGradient className="p-1 rounded-xl">
                <div className="relative">
                    {chapter_barge ? <img
                        src={chapter_barge}
                        alt="Angels of Resolution"
                        height="180"
                        width="200"
                        className="object-contain rounded-xl"
                    /> : <div className="p-1 rounded-xl h-[180px] w-[200px]" />}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    {name ? <p className="text-white text-l font-bold">{name}</p> : <p className="text-white text-l font-bold"><Plus /></p>}
                        
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
}