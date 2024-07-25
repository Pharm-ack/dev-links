import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/index";
import { getUserByEmail } from "@/lib/user";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);

        const validatedFormData = LoginSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          console.log("Validation failed:", validatedFormData.error);
          return null;
        }

        const { email, password } = validatedFormData.data;
        console.log("Validated email:", email);

        const user = await getUserByEmail(email);
        console.log("User found:", user ? "Yes" : "No");

        if (!user || !user.password) {
          console.log("No user found or user has no password");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log("Passwords match:", passwordsMatch);

        if (!passwordsMatch) {
          console.log("Invalid password");
          return null;
        }

        console.log("Authentication successful");
        return user;
      },
    }),
  ],
} as NextAuthConfig;
