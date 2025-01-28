import Logo from "../assets/logo.png"
import { RegisterForm } from "../components/register-form"
import { supabase } from "../config/api"

export default function RegisterPage() {

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex h-12 w-32 items-center justify-center rounded-md text-primary-foreground">
            <img src={Logo} alt="Logo" className="h-16 w-16 rounded-full" />
          </div>
          Acme Inc.
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
