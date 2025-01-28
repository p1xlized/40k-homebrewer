import { useAuth } from "../lib/contexts/AuthContext"
import { supabase } from "../config/api"
import { Button } from "../components/ui/button"
import { useNavigate } from "@tanstack/react-router"
import { Footer, FooterBottom, FooterColumn, FooterContent } from "../components/ui/footer"

const Home = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      logout()
      navigate({ to: '/login' })
      if (error) throw error
    } catch (error) {
      console.log(error)
    }

  }

  console.log(user);
  return (
    <div><Button onClick={handleLogout}>Logout</Button>
      <Footer>

        <FooterContent>

          <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">

            <div className="flex items-center gap-2">


              <h3 className="text-xl font-bold">Launch UI</h3>

            </div>

          </FooterColumn>

          <FooterColumn>

            <h3 className="text-md pt-1 font-semibold">Product</h3>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Changelog

            </a>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Documentation

            </a>

          </FooterColumn>

          <FooterColumn>

            <h3 className="text-md pt-1 font-semibold">Company</h3>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              About

            </a>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Careers

            </a>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Blog

            </a>

          </FooterColumn>

          <FooterColumn>

            <h3 className="text-md pt-1 font-semibold">Contact</h3>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Discord

            </a>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Twitter

            </a>

            <a

              href="/"

              className="text-sm text-muted-foreground"

            >

              Github

            </a>

          </FooterColumn>

        </FooterContent>

        <FooterBottom>

          <div>© 2024 Mikołaj Dobrucki. All rights reserved</div>

          <div className="flex items-center gap-4">

            <a href="/">Privacy Policy</a>

            <a href="/">Terms of Service</a>

            

          </div>

        </FooterBottom>

      </Footer></div>
  )
}

export default Home