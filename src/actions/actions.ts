"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedUser = LoginSchema.safeParse(data);

  if (!validatedUser.success) {
    return { error: "Invalid Credentials!" };
  }

  const { password, email } = validatedUser.data;

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Invalid credentials." };
      }
    }
    return { error: "Invalid credentials." };
  }
}

//Sign up
export async function signup(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("password"),
  };

  const validatedUser = RegisterSchema.safeParse(data);

  if (!validatedUser.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedUser.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
