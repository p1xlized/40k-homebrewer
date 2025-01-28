import { useAuth } from "../lib/contexts/AuthContext"
import { supabase } from "../config/api"
import { Button } from "../components/ui/button"
import { useNavigate } from "@tanstack/react-router"

const Home = () => {
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
    <div><Button onClick={handleLogout}>Logout</Button></div>
  )
}

export default Home