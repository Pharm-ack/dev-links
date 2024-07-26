import LoginForm from "@/components/login-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="px-4 flex gap-y-8 flex-col items-center justify-center h-[100vh]">
      <div className="w-full sm:w-auto">
        <Logo />
      </div>
      <LoginForm />
    </div>
  );
}
