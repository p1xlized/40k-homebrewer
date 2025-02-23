import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Pencil, Check, X, Settings2 } from "lucide-react";
import { supabase } from "../config/api";
import Imperium from "../assets/ressources/imperium.jpg";
import Chaos from "../assets/ressources/chaos.jpg";
import { PinnedChapter } from "../components/pinned-chapter-card";
import { useParams } from "@tanstack/react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";

interface UserProfile {
  auth_id: string;
  favorite_faction: string;
  id: string;
  picture_url: string;
  username: string;
}

function Profile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const params = useParams({ from: "/app/profile/$id" });
  const id = params.id;
  const [pinned, setPinned] = useState<any[]>([]);

  async function fetchProfiles() {
    try {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single();
      const { data: pinnedWithChapters } = await supabase
        .from("pinned")
        .select("*, chapters(*)")
        .eq("user_id", id);

      setData(profile);
      setPinned(pinnedWithChapters || []);
      setNewUsername(profile?.username || "");
      setNewImage(profile?.picture_url || null);
    } catch (error) {
      console.log(error);
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

  const handleSave = async () => {
    if (!data) return;

    try {
      await supabase
        .from("profiles")
        .update({ username: newUsername, picture_url: newImage })
        .eq("id", id);

      setData((prev) => (prev ? { ...prev, username: newUsername, picture_url: newImage || prev.picture_url } : null));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    fetchProfiles();
  }, [id]);

  if (!data) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        <div className="shadow-sm rounded-lg mb-6 bg-back">
          <div className="relative">
            <img
              src={data.favorite_faction === "loyalist" ? Imperium : Chaos}
              alt="Cover Photo"
              className="w-full h-[92vh] object-cover rounded-xl"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-4 text-center">
              <div className="flex flex-col items-center justify-center">
                {isEditing ? (
                  <>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                    {newImage && (
                      <img src={newImage} alt="New Avatar" className="h-32 w-32 rounded-full border-4 border-white" />
                    )}
                    <Input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="mt-2 text-center bg-muted/50 p-2 rounded-md"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={data.picture_url}
                      alt="Avatar"
                      className="h-32 w-32 rounded-full border-4 border-white"
                    />
                    <p className="text-lg text-white font-semibold">
                      <strong>{data.username}</strong>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="absolute top-4 left-4">
            </div>
            <div className="absolute top-4 right-4">
              {isEditing ? (
                <>
                  <Button variant="secondary" className="mx-2" onClick={handleSave}>
                    <Check />
                  </Button>
                  <Button variant="destructive" onClick={() => setIsEditing(false)}>
                    <X />
                  </Button>
                </>
              ) : (
                <>
                  <Sheet>
                    <SheetTrigger>
                      <Button className="mx-2">
                        <Settings2 />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="w-full">
                      <SheetHeader>
                        <SheetTitle>Chose you Background</SheetTitle>
                        <SheetDescription>
                          <div>
                            <div className="flex w-full items-center mt-auto relative z-10 mt-4 mb-4">
                              <div className="flex-1 border-b border-primary mr-2"></div>
                              <Badge variant="secondary" className="gap-1">
                                Traitors
                              </Badge>
                              <div className="flex-1 border-b border-primary ml-2"></div>
                            </div>
                            <div className="flex justify-around gap-4">
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                            </div>
                            <div className="flex w-full items-center mt-auto relative z-10 mt-4 mb-4">
                              <div className="flex-1 border-b border-primary mr-2"></div>
                              <Badge variant="destructive" className="gap-1">
                                Traitors
                              </Badge>
                              <div className="flex-1 border-b border-primary ml-2"></div>
                            </div>
                            <div className="flex justify-around gap-4">
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                              <div className="aspect-video h-28 bg-gray-300"></div>
                            </div>
                          </div>

                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <Button onClick={() => setIsEditing(true)}>
                    <Pencil />
                  </Button>
                </>

              )}
            </div>

            {/* Pinned Chapters */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {[0, 1, 2, 3].map((slot) => {
                const item = pinned[slot];
                return (
                  <div key={slot}>
                    {item ? (
                      <PinnedChapter name={item.chapters.name} chapter_barge={item.chapters.chapter_barge} />
                    ) : (
                      <PinnedChapter />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
