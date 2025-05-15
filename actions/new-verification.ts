"use server";
import { prisma } from "@/prisma/connection";
import { getVerificationTokenByToken } from "@/utils/verification-token";
import { getUserByEmail } from "@/utils/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { AuthError } from "next-auth";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "No verification token found." };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Verification token has expired." };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User not found." };
  }
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified successfully!" };
};
