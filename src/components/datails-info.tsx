import { CalendarRange, Dna, Eclipse } from "lucide-react";
import { Badge } from "./ui/badge";

interface DetailsInfoProps {
    chapterBarge: string | undefined;
    founding: string | null;
    homeworld: string | null;
    geneSeed: string | null;
    name: string | undefined;
    lore?: string | null;
}

const DetailsInfo = ({ chapterBarge, founding, homeworld, geneSeed, name, lore }: DetailsInfoProps) => {
    return (
        <>
            <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                <div className="rounded-xl">
                    <img
                        src={chapterBarge}
                        alt="Chapter Barge"
                        className="w-48 h-48 object-cover rounded-full"
                    />
                </div>
                <div className="aspect-video rounded-xl mt-6">
                    <h4 className="text-xl font-bold mt-2">{name}</h4>
                    <div className="mt-2">

                        <Badge className="w-full mb-2">
                            <CalendarRange size={16} />
                            {founding}
                        </Badge>
                        <Badge className="w-full mb-2">
                            <Eclipse size={16} />
                            {homeworld}
                        </Badge>
                        <Badge className="w-full mb-2">
                            <Dna size={16} />
                            {geneSeed}
                        </Badge>
                    </div>
                </div>
            </div>


            {lore && (
                <>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Story
                        </span>
                    </div>
                    <p className="text-sm mt-2">{lore}</p>
                </>
            )}

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Fighting Doctrine
                </span>
            </div>
        </>
    );
};

export default DetailsInfo;
