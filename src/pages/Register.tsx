import { RegisterForm } from "../components/register-form";
import registerBackground from "../assets/ressources/register-background.jpg";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_2fr]">
      <div className="flex items-start justify-center mt-[10vh]">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block overflow-hidden">
        <img
          src={registerBackground}
          alt="Image"
          className="w-full h-full object-cover animate-slide"
        />
      </div>
    </div>
  );
}
