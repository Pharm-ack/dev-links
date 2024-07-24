import Logo from "@/components/logo";
import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-y-8 p-3 justify-center items-center min-h-screen">
      <div className="w-full sm:w-auto">
        <Logo />
      </div>
      <RegisterForm />
    </div>
  );
}