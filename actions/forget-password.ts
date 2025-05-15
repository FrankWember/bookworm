"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/utils/user";

export const resetPassword = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email doesn't exist" };
    }
    if (!existingUser.emailVerified) {
      return { error: "Email not yet verified" };
    }

    const resetToken = await generateVerificationToken(email);
    if (!resetToken?.token || !resetToken?.email) {
      return { error: "Failed to generate reset token" };
    }

    await sendPasswordResetEmail(resetToken.email, resetToken.token);

    return { success: "Password reset email sent" };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
