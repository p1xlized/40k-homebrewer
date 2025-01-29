import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "../lib/contexts/AuthContext"
import { supabase } from "../config/api"
import { Button } from "./ui/button"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function CommunitySideBar() {
    const { user,logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async() => {
        try {
            const { error } = await supabase.auth.signOut()
            logout()
            navigate({ to: '/login' })
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
        
    }
  
    console.log(user);
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarHeader>

        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
            <Button onClick={handleLogout}>Logout</Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
