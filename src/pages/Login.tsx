import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "../components/login-form"
import Logo from "../assets/branding/logo.png"  // Import the logo image

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-4 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <img src={Logo} alt="Logo" className="h-48 w-48 rounded-full" />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
