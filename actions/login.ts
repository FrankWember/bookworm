"use server";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/utils/user";
import { AuthError } from "next-auth";
export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    console.log("verificationToken", verificationToken);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "A confirmation email has already been sent.",
    };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Login Sucess!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
