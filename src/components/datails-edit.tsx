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

const DetailsEdit = ({ chapterBarge, founding, homeworld, geneSeed, name, lore }: DetailsEditProps) => {
    return (
        <form className="space-y-4">
            <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                <div className="rounded-xl">
                    <img
                        src={chapterBarge || "/placeholder-image.png"}
                        alt="Chapter Barge"
                        className="w-48 h-48 object-cover rounded-full"
                    />
                </div>
                <div className="aspect-video rounded-xl">
                    <input
                        type="text"
                        name="name"
                        defaultValue={name}
                        placeholder="Chapter Name"
                        className="w-full text-xl font-bold mt-2 bg-transparent border-b outline-none"
                    />
                </div>
            </div>

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Badge className="gap-1">
                    <CalendarRange size={16} />
                    <input
                        type="text"
                        name="founding"
                        defaultValue={founding}
                        placeholder="Founding Date"
                        className="bg-transparent outline-none border-b"
                    />
                </Badge>
                <Badge className="gap-1">
                    <Eclipse size={16} />
                    <input
                        type="text"
                        name="homeworld"
                        defaultValue={homeworld}
                        placeholder="Homeworld"
                        className="bg-transparent outline-none border-b"
                    />
                </Badge>
                <Badge className="gap-1">
                    <Dna size={16} />
                    <input
                        type="text"
                        name="geneSeed"
                        defaultValue={geneSeed}
                        placeholder="Gene Seed"
                        className="bg-transparent outline-none border-b"
                    />
                </Badge>
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Story
                </span>
            </div>
            <textarea
                name="lore"
                defaultValue={lore}
                placeholder="Enter chapter lore..."
                className="w-full text-sm bg-transparent outline-none border p-2 rounded-lg"
                rows={4}
            />

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Fighting Doctrine
                </span>
            </div>

            <button type="submit" className="w-full p-2 bg-primary text-white rounded-lg">
                Save
            </button>
        </form>
    );
};

export default DetailsEdit;
