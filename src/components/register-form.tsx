import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { supabase } from "../config/api"
import { useState } from "react"
import loyalist from "../assets/ressources/loyalist.gif"
import heretic from "../assets/ressources/heretic.gif"
import { useNavigate } from "@tanstack/react-router"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedGif, setSelectedGif] = useState<"loyalist" | "heretic" | null>(null)
  const navigate = useNavigate();
  async function handleRegister() {
    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (signUpError) throw signUpError; // Handle sign-up errors

      // Insert into the "profiles" table
      const { error: profileInsertError } = await supabase.from("profiles").insert({
        auth_id: data.user!.id!,
        username: username,
        favorite_faction: selectedGif
      });

      if (profileInsertError) throw profileInsertError; // Handle profile insertion errors

      console.log("User registered with GIF selection:", selectedGif);
      navigate({ to: '/login' })
    } catch (err: any) {
      console.error("Registration failed:", err.message);
    }
  }
  console.log(username, email, password, selectedGif)
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault() // Prevent form submission reload
        handleRegister()
      }}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-balance text-sm text-muted-foregroun">Register</h2>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your information below to register to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Ex: SmollNoukNouk"
            required
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div
            className={cn(
              "rounded-xl bg-muted/50 p-2 cursor-pointer",
              selectedGif === 1 && "ring-4 ring-primary"
            )}
            onClick={() => setSelectedGif(1)}
          >
            <img src={loyalist} alt="Loyalist" className="h-32 w-32" />
          </div>
          <div
            className={cn(
              "rounded-xl bg-muted/50 p-2 cursor-pointer",
              selectedGif === 2 && "ring-4 ring-primary"
            )}
            onClick={() => setSelectedGif(2)}
          >
            <img src={heretic} alt="Heretic" className="h-32 w-32" />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={!selectedGif}>
          Register
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Already registered?{" "}
        <Button variant="link" className="" onClick={() => navigate({ to: '/login' })}>
          Login
        </Button>
      </div>
    </form>
  )
}
