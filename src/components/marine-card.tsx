import React from 'react'
import { Badge } from './ui/badge'
import { Sword } from 'lucide-react'

interface MarineCardProps {
    onClick?:() => void,
    role: string,
    icon: React.ReactNode
    
}
const MarineCard: React.FC<MarineCardProps> = ({ onClick, role, icon }) => {
  return (
    <div
    className="flex flex-col justify-end rounded-xl bg-muted/50 h-full p-2 cursor-pointer"
    onClick={onClick}
>
    <div className="flex w-full items-center">
        <div className="flex-1 border-b border-backgroud mr-2"></div>

        <Badge variant="secondary" className="gap-1">
            {icon}
            {role}
        </Badge>
        <div className="flex-1 border-b border-backgroud ml-2"></div>
    </div>

</div>
  )
}

export default MarineCard