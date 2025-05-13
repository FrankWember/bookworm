import { prisma } from "@/prisma/connection";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) return null;
  return user;
};
