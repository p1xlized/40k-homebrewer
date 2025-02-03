import React from "react";
import { Card, CardContent } from "./ui/card";
import folder from "../assets/ressources/folder.png";
interface ChapterCardProps {
  name: string;
  image: string;
  onClick: () => void;
}


const ChapterCard: React.FC<ChapterCardProps> = ({ name, image, onClick }) => {
  console.log(image)
  return (
    <Card onClick={onClick} className="cursor-pointer w-72 bg-muted/50 p-3 hover:bg-muted transition flex flex-col items-center border border-muted">
      <CardContent className="relative w-64 h-64 rounded-lg overflow-hidden ">
        {/* Custom Folder SVG */}
        {folder ? (
          <img src={folder} alt="Folder Icon" className="absolute inset-0 w-full h-full " />
        ) : (
          <svg className="absolute inset-0 w-full h-full opacity-50 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H2V20H22V6H12L10 4Z" />
          </svg>
        )}


        {/* <img src={image} alt="Preview" className="absolute inset-0 w-20 h-20 object-cover rounded-sm" /> */}
      </CardContent>

      {/* Folder Name */}
      <p className="mt-2 text-sm font-medium text-center">{name}</p>
    </Card>
  );
};

export default ChapterCard;
