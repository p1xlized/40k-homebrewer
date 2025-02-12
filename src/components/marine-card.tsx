import React from 'react'
import { Badge } from './ui/badge'
import Classified from "../assets/ressources/classified.png"

interface MarineCardProps {
    onClick?: () => void,
    role: string,
    icon: React.ReactNode
    classified?: boolean
}

const MarineCard: React.FC<MarineCardProps> = ({ onClick, role, icon, classified }) => {
    const bgClass = classified ? "bg-background/25" : "bg-muted/50"; 

    const handleClick = (event: React.MouseEvent) => {
        if (!classified && onClick) {
            onClick(event);
        }
    };

    return (
        <div
            className={`relative flex flex-col justify-between ${bgClass} ${classified && "border border-muted "} rounded-xl h-full p-2 cursor-pointer overflow-hidden`}
            onClick={handleClick}
        >
            {classified && (
                <img 
                    src={Classified} 
                    alt="Classified" 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-32 h-32 object-cover rounded-full z-10"
                />
            )}

            {/* Bottom Badge */}
            <div className="flex w-full items-center mt-auto relative z-10">
                <div className="flex-1 border-b border-background mr-2"></div>
                <Badge variant="secondary" className="gap-1">
                    {icon}
                    {role}
                </Badge>
                <div className="flex-1 border-b border-background ml-2"></div>
            </div>
        </div>
    );
};

export default MarineCard
