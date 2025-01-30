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
import Editor from "../pages/Editor"

// Menu items.
const items = [
  {
    title: "Editor",
    url: "/collections",
    icon: Editor,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
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
                    <Button variant="link" onClick={()=> navigate({to: item.url})}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
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
