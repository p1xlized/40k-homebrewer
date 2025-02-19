import { useCharacterLimit } from "../hooks/use-character-limit";
import { useImageUpload } from "../hooks/use-image-upload";
import { Button } from "../components/ui/button";
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Check, Heart, ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useParams } from "@tanstack/react-router";
import { supabase } from "../config/api";
import Imperium from "../assets/ressources/imperium.jpg"
import Chaos from "../assets/ressources/chaos.jpg"

interface UserProfile {
  auth_id: string;
  favorite_faction: string;
  id: string;
  picture_url: string;
  username: string;
}

function Profile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const params = useParams({ from: '/app/profile/$id' });
  const id = params.id;

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue:
      "Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!",
  });

  async function fetchProfiles() {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, [id]);

  if (!data) {
    // Loading state
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
<div className="min-h-screen">
  <div className="w-full mx-auto p-4">
    <div className="shadow-sm rounded-lg mb-6 bg-back">
      <div className="relative">
        {/* Profile Background Image */}
        <img
          src={data.favorite_faction === "loyalist" ? Imperium : Chaos}
          alt="Cover Photo"
          className="w-full h-[88vh] object-cover rounded-xl"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-4 text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Avatar with larger size */}
            <img
              src={data.picture_url}
              alt="Avatar"
              className="h-32 w-32 rounded-full border-4 border-white"
            />
            {/* Username below Avatar */}
            <p className="text-lg text-white font-semibold">
              <strong>{data.username}</strong>
            </p>
          </div>
        </div>

        {/* Edit Profile Button in Top Right Corner */}
        <div className="absolute top-4 right-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit profile</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
              <DialogHeader className="contents space-y-0 text-left">
                <DialogTitle className="border-b border-border px-6 py-4 text-base">
                  Edit profile
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                Make changes to your profile here. You can change your photo and set a username.
              </DialogDescription>
              <div className="overflow-y-auto">
                <ProfileBg defaultImage="https://originui.com/profile-bg.jpg" />
                <Avatar defaultImage="https://originui.com/avatar-72-01.jpg" />
                <div className="px-6 pb-6 pt-4">
                  <form className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`${id}-first-name`}>First name</Label>
                        <Input
                          id={`${id}-first-name`}
                          placeholder="Matt"
                          defaultValue="Margaret"
                          type="text"
                          required
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`${id}-last-name`}>Last name</Label>
                        <Input
                          id={`${id}-last-name`}
                          placeholder="Welsh"
                          defaultValue="Villard"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-username`}>Username</Label>
                      <div className="relative">
                        <Input
                          id={`${id}-username`}
                          className="peer pe-9"
                          placeholder="Username"
                          defaultValue="margaret-villard-69"
                          type="text"
                          required
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="text-emerald-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-website`}>Website</Label>
                      <div className="flex rounded-lg shadow-sm shadow-black/5">
                        <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                          https://
                        </span>
                        <Input
                          id={`${id}-website`}
                          className="-ms-px rounded-s-none shadow-none"
                          placeholder="yourwebsite.com"
                          defaultValue="www.margaret.com"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${id}-bio`}>Biography</Label>
                      <Textarea
                        id={`${id}-bio`}
                        placeholder="Write a few sentences about yourself"
                        defaultValue={value}
                        maxLength={maxLength}
                        onChange={handleChange}
                        aria-describedby={`${id}-description`}
                      />
                      <p
                        id={`${id}-description`}
                        className="mt-2 text-right text-xs text-muted-foreground"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="tabular-nums">{limit - characterCount}</span> characters left
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <DialogFooter className="border-t border-border px-6 py-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Row of 4 divs inside the image */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm w-1/5">Div 1</div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm w-1/5">Div 2</div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm w-1/5">Div 3</div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm w-1/5">Div 4</div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Profile;

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
    useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt={previewUrl ? "Preview of uploaded image" : "Default profile background"}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  );
}

