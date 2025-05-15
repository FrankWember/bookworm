"use server";
import { getUserByEmail } from "@/utils/user";
import {
  getAllVerificationTokens,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/utils/verification-token";
import { prisma } from "@/prisma/connection";
import bycrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const updatePassword = async (token: string, password: string) => {
  console.log("Received token:", token);

  const verificationToken = await getVerificationTokenByToken(token);
  console.log("This verification tokens:", verificationToken);

  const AllVerificationTokens = await getAllVerificationTokens();
  console.log("All verification tokens:", AllVerificationTokens);

  if (!verificationToken) {
    return { error: "No verification token found." };
  }
  const hasExpired = new Date(verificationToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Verification token has expired." };
  }
  const existingUser = await getUserByEmail(verificationToken.email);
  if (!existingUser) {
    return { error: "User not found." };
  }
  const hashedPassword = await bycrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });
  return { success: "Password updated successfully!" };
};
