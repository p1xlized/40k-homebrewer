import { CalendarRange, Dna, Eclipse } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { supabase } from "../config/api";
import { Button } from "./ui/button";
import { useFileInput } from "../hooks/use-file-input";

interface DetailsEditProps {
    chapterBarge: string | undefined;
    founding: string | null;
    homeworld: string | null;
    geneSeed: string | null;
    name: string | undefined;
    lore?: string | null;
    chapter_id: string;
    editMode: void;

}

const DetailsEdit = ({ chapterBarge, founding, homeworld, geneSeed, name, lore, chapter_id, editMode }: DetailsEditProps) => {
    const [foundingValue, setFoundingValue] = useState(founding || "");
    const [homeworldValue, setHomeworldValue] = useState(homeworld || "");
    const [geneSeedValue, setGeneSeedValue] = useState(geneSeed || "");
    const [nameValue, setNameValue] = useState(name || "");
    const [loreValue, setLoreValue] = useState(lore || "");
    const [newImage, setNewImage] = useState<string | null>(chapterBarge || null);

    const {
        fileName,
        error,
        fileInputRef,
        clearFile
    } = useFileInput({
        maxSize: 2
    });

    async function saveChanges() {
        try {
            const { error } = await supabase.from("chapters").update({
                founding: foundingValue,
                homeworld: homeworldValue,
                gene_seed: geneSeedValue,
                name: nameValue,
                lore: loreValue,
                chapter_barge: newImage,
            }).eq("chapter_id", chapter_id);
            if (error) {
                console.error("Error updating chapter:", error);
            }
            editMode();
            console.log("Chapter updated successfully");
        }
        catch (error) {
            console.error("Error updating chapter:", error);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setNewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    console.log(chapterBarge, foundingValue, homeworldValue, geneSeedValue, nameValue, loreValue, chapter_id)
    return (
        <div className="space-y-4">
            <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                <div className="rounded-xl">
                    <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <Button
                                onClick={() => fileInputRef.current?.click() }
                                variant="outline"
                            >
                                Select File
                            </Button>
                            {fileName && (
                                <Button
                                    onClick={clearFile}
                                    variant="ghost"
                                    size="sm"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />

                        {fileName && (
                            <p className="text-sm text-muted-foreground">
                                Selected: {fileName}
                            </p>
                        )}
                        {error && (
                            <p className="text-sm text-red-500">
                                Error: {error}
                            </p>
                        )}
                    </div>
                    {newImage && (
                        <img src={newImage} alt="New Avatar" className="h-48 w-48 rounded-full border-4 border-white" />
                    )}

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
                    <div className="mt-2">

                        <Badge className="p-2 w-full mb-2">
                            <CalendarRange size={16} />
                            <input
                                type="text"
                                name="founding"
                                defaultValue={founding || ""}
                                value={foundingValue}
                                placeholder="Founding Date"
                                className="bg-transparent outline-none border-b"
                                onChange={(e) => setFoundingValue(e.target.value)}
                            />
                        </Badge>
                        <Badge className="p-2 w-full mb-2">
                            <Eclipse size={16} />
                            <input
                                type="text"
                                name="homeworld"
                                defaultValue={homeworld || ""}
                                value={homeworldValue}
                                placeholder="Homeworld"
                                className="bg-transparent outline-none border-b"
                                onChange={(e) => setHomeworldValue(e.target.value)}
                            />
                        </Badge>
                        <Badge className="p-2 w-full mb-2">
                            <Dna size={16} />
                            <input
                                type="text"
                                name="geneSeed"
                                defaultValue={geneSeed || ""}
                                value={geneSeedValue}
                                placeholder="Gene Seed"
                                className="bg-transparent outline-none border-b"
                                onChange={(e) => setGeneSeedValue(e.target.value)}
                            />
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Story
                </span>
            </div>
            <textarea
                name="lore"
                defaultValue={lore || ""}
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
