import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CardFooter } from "./ui/card";

export function StackedCollectionCard({
  name,
  geneSeed,
  imageUrl,
}: {
  name: string;
  geneSeed: string;
  imageUrl?: string;
}) {
  return (
    <div className="relative w-64 h-48 group"> {/* Added group for hover effect */}
    

      {/* Foreground (Main Card) */}
      <motion.div whileHover={{ y: -5 }} className="absolute inset-0 z-10">
        <Card className="relative w-full h-full shadow-lg rounded-xl">
          {/* Image Section (background image with blur effect) */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-t-xl transition-all duration-300 group-hover:filter-none filter blur-sm rounded-xl" 
            style={{
              backgroundImage: `url(${imageUrl || "https://cdn.mos.cms.futurecdn.net/BGBWW5VsRVjrPUT4QxjMDB-650-80.jpg.webp"})`,
              height: "100%", // Adjust based on your preference
            }}
          />
          
          <CardFooter className="relative z-10">
            <p className="text-x text-gray-200">{name}</p>
            <p className="text-sm text-gray-200">Gene Seed: {geneSeed}</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
