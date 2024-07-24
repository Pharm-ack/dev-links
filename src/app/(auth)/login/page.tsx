import LoginForm from "@/components/login-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="p-3 flex gap-y-8 flex-col items-center min-h-screen">
      <div className="w-full sm:w-auto">
        <Logo />
      </div>
      <LoginForm />
    </div>
  );
}