"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { LoginSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/actions/actions";
import { LucideLoader2 } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const response = await login(formData);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Login was successful!");
      router.push("/links");
    }
  }

  return (
    <div className="mx-auto w-full md:w-[476px] rounded-md sm:shadow-md sm:bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Add your details below to get back into the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Input
                  className={`pl-10 pr-24 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email")}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. alex@email.com"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    alt=""
                    src="/phenvelopesimplefill.svg"
                  />
                </div>
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <p className="text-xs text-red-500">
                      {String(errors.email.message)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  className={`pl-10 pr-24 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    alt=""
                    src="/phlockkeyfill.svg"
                  />
                </div>
                {errors.password && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <p className="text-xs text-red-500">
                      {String(errors.password.message)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-white w-full  hover:bg-[#BEADFF] shadow"
              >
                {isSubmitting ? (
                  <LucideLoader2 className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Create account
          </Link>
        </div>
      </CardContent>
    </div>
  );
}
