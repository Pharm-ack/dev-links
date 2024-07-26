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
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schemas";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "@/actions/actions";
import { LucideLoader2 } from "lucide-react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const response = await signup(formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("User created!");
      router.push("/login");
    }
  }

  return (
    <div className="mx-auto w-full md:w-[476px] rounded-md sm:shadow-md sm:bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Create account</CardTitle>
        <CardDescription>
          Let’s get you started sharing your links!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
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

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
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

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  className="pl-10 "
                  id="password"
                  type="password"
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
                {errors.confirmPassword && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <p className="text-xs text-red-500">
                      {String(errors.confirmPassword.message)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className=" text-[#737373] text-sm">
              Password must contain at least 8 characters
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white w-full hover:bg-[#BEADFF] shadow"
            >
              {isSubmitting ? (
                <LucideLoader2 className="animate-spin" />
              ) : (
                "Create new account"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </div>
      </CardContent>
    </div>
  );
}
