import { prisma } from "@/prisma/connection";
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  console.log("Received token:", token);
  if (!token) {
    console.log("No token provided");
    return null;
  }
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getAllVerificationTokens = async () => {
  try {
    const verificationTokens = await prisma.verificationToken.findMany();
    return verificationTokens;
  } catch (error) {
    console.error("Error retrieving verification tokens:", error);
    return [];
  }
};
