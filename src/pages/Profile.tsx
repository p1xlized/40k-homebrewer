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
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useParams } from "@tanstack/react-router";

function Profile() {
  const id = useParams({ from: '/app/profile/$id' })

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

  return (
    <div className="min-h-screen ">

      <div className="w-full mx-auto p-4">
        <div className="shadow-sm rounded-lg mb-6 bg-back">
          <div className="relative">
            <img
              src="https://picsum.photos/1200/400"
              alt="Cover Photo"
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                <div className="flex items-center justify-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src=""
                      alt="Avatar 01"
                      className="h-32 w-32 rounded-full border-4 border-white"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-lg text-white font-semibold">
                    <strong>test</strong>
                  </p>
                </div>

                {/* Center Column: Empty for now */}
                <div className="flex-grow"></div>

                {/* Right Column: Empty for now */}
                <div className="flex items-center justify-end">
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
            </div>
          </div>
        </div>




        {/* Profile Content (Posts, etc.) */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h2>

          {/* New Post Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Post
            </button>
          </div>

          {/* Example Post */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h3 className="font-semibold text-gray-900">User Name</h3>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor gravida quam, ac vehicula justo.
            </p>
            <div className="flex space-x-6">
              <button className="text-gray-600 hover:text-blue-600">Like</button>
              <button className="text-gray-600 hover:text-blue-600">Comment</button>
              <button className="text-gray-600 hover:text-blue-600">Share</button>
            </div>
          </div>

          {/* Another Post */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h3 className="font-semibold text-gray-900">User Name</h3>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Curabitur vehicula dui eget tortor faucibus sollicitudin. Integer ac justo arcu.
            </p>
            <div className="flex space-x-6">
              <button className="text-gray-600 hover:text-blue-600">Like</button>
              <button className="text-gray-600 hover:text-blue-600">Comment</button>
              <button className="text-gray-600 hover:text-blue-600">Share</button>
            </div>
          </div>
        </div>

      </div>
    </div>



  );
}

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

export default Profile
