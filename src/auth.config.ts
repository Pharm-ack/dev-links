import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/index";
import { getUserByEmail } from "@/lib/user";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // runs on login
        // validation
        const validatedFormData = LoginSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }
        // extract values
        const { email, password } = validatedFormData.data;
        const user = await getUserByEmail(email);
        if (!user) {
          console.log("No user found");
          return null;
        }
        const passwordsMatch = user.password
          ? await bcrypt.compare(password, user.password)
          : false;
        if (!passwordsMatch) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
} as NextAuthConfig;
