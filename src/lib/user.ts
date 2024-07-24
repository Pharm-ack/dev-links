import prisma from "@/lib/db";

import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserByUsername = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};
