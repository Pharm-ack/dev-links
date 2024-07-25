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

  console.log("Login function called with data:", data);

  const validatedUser = LoginSchema.safeParse(data);

  if (!validatedUser.success) {
    console.log("Validation failed:", validatedUser.error);
    return { error: "Invalid Credentials!" };
  }

  const { email, password } = validatedUser.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("SignIn result:", result);

    if (result?.error) {
      return { error: result.error };
    }

    return { success: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "An error occurred during login." };
      }
    }
    return { error: "An unexpected error occurred." };
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
