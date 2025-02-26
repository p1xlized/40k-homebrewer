import { CalendarRange, Dna, Eclipse, Save } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { supabase } from "../config/api";

interface DetailsEditProps {
    chapterBarge: string | undefined;
    founding: string | null;
    homeworld: string | null;
    geneSeed: string | null;
    name: string | undefined;
    lore?: string | null;
    chapter_id: string;

}

const DetailsEdit = ({ chapterBarge, founding, homeworld, geneSeed, name, lore, chapter_id }: DetailsEditProps) => {
    const [foundingValue, setFoundingValue] = useState(founding || "");
    const [homeworldValue, setHomeworldValue] = useState(homeworld || "");
    const [geneSeedValue, setGeneSeedValue] = useState(geneSeed || "");
    const [nameValue, setNameValue] = useState(name || "");
    const [loreValue, setLoreValue] = useState(lore || "");

    async function saveChanges() {
        try {
            const { error } = await supabase.from("chapters").update({
                founding: foundingValue,
                homeworld: homeworldValue,
                gene_seed: geneSeedValue,
                name: nameValue,
                lore: loreValue,
            }).eq("chapter_id", chapter_id);
            if (error) {
                console.error("Error updating chapter:", error);
            }
            console.log("Chapter updated successfully");
        }
        catch (error) {
            console.error("Error updating chapter:", error);
        }

        // // Implement your save logic here
        // console.log("Saving changes...");
    }
    console.log(chapterBarge, foundingValue, homeworldValue, geneSeedValue, nameValue, loreValue, chapter_id)
    return (
        <div className="space-y-4">
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
                        onChange={(e) => setNameValue(e.target.value)}
                        value={nameValue}
                    />
                </div>
            </div>

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Badge className="gap-1 h-8 p-2">
                    <CalendarRange size={16} />
                    <input
                        type="text"
                        name="founding"
                        defaultValue={founding}
                        value={foundingValue}
                        placeholder="Founding Date"
                        className="bg-transparent outline-none border-b"
                        onChange={(e) => setFoundingValue(e.target.value)}
                    />
                </Badge>
                <Badge className="gap-1">
                    <Eclipse size={16} />
                    <input
                        type="text"
                        name="homeworld"
                        defaultValue={homeworld}
                        value={homeworldValue}
                        placeholder="Homeworld"
                        className="bg-transparent outline-none border-b"
                        onChange={(e) => setHomeworldValue(e.target.value)}
                    />
                </Badge>
                <Badge className="gap-1">
                    <Dna size={16} />
                    <input
                        type="text"
                        name="geneSeed"
                        defaultValue={geneSeed}
                        value={geneSeedValue}
                        placeholder="Gene Seed"
                        className="bg-transparent outline-none border-b"
                        onChange={(e) => setGeneSeedValue(e.target.value)}
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
                onChange={(e) => setLoreValue(e.target.value)}
                value={loreValue}
            />

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Fighting Doctrine
                </span>
            </div>

            <button className="w-full p-2 bg-primary text-white rounded-lg" onClick={saveChanges}>
                Save
            </button>
        </div>
    );
};

export default DetailsEdit;
