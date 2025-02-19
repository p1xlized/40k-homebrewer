import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart } from "lucide-react";

interface ChapterCardReworkProps {
  image_url: string;
  name: string;
  gene_seed: string;
  user_name: string;
  picture_url: string;
  onClick: () => void;
}
function ChapterCardRework({ image_url, name, gene_seed, user_name, picture_url, onClick }: ChapterCardReworkProps) {
  return (
    <Card className="cursor-pointer w-72 h-96 transition flex flex-col items-center" onClick={onClick}>
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: 'center center',
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative w-full h-full rounded-xl"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl rounded-xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
        />
        <img
          src={image_url}
          alt="Ghost in the shell - Kôkaku kidôtai"
          className="h-full w-full rounded-xl object-cover grayscale duration-700 group-hover:grayscale-0"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex bg-muted/50 flex-col justify-center items-center text-center px-4 py-2 z-20">
          <h3 className="text-xl font-bold font-sans text-white">
            {name}
          </h3>
          <p className="text-sm text-white">{gene_seed}</p>
        </div>
      </Tilt>

      {/* Avatar, Username, and Right Column */}
      <div className="flex items-center justify-between rounded-full p-2 shadow shadow-black/5 w-full">
        {/* Avatar Section */}
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={picture_url} alt="Avatar 01" className="h-6 w-6 rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Centered Text Section */}
        <div className="flex items-center justify-center flex-grow">
          <p className="text-xs text-muted-foreground">
            <strong className="font-medium text-foreground">{user_name}</strong>
          </p>
        </div>

        {/* Empty Right Column for Future Content */}
        <div className="flex items-center justify-end">
          <p className="flex items-center space-x-1">
            <span>
              <Heart className="w-4 h-4" />
            </span>
            <span>16</span>
          </p>

        </div>
      </div>

    </Card>

  );
}

export default ChapterCardRework;
