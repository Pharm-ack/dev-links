import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
