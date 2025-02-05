import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardContent } from "./ui/card";

interface ChapterCardReworkProps {
  image_url: string;
  name: string;
  gene_seed: string;
  user_name: string
}
function ChapterCardRework({image_url, name, gene_seed, user_name}: ChapterCardReworkProps) {
  return (
    <Card className="cursor-pointer w-72 h-96 transition flex flex-col items-center bg-primary p-2">

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
        className="group relative w-full h-full"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
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
        {/* Text overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex bg-muted/50 flex-col justify-center items-center text-center px-4 py-2 z-20">
          <h3 className="text-xl font-bold font-sans text-white">
            {name}
          </h3>
          <p className="text-sm text-white">{gene_seed}</p>
        </div>
      </Tilt>
      <p>{user_name}</p>
    </Card>
  );
}

export default ChapterCardRework;
