"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/connection";
import { getUserByEmail } from "@/utils/user";

type RegisterInput = {
  email: string;
  name: string;
  password: string;
};

export const register = async (values: RegisterInput) => {
  const { email, name, password } = values;

  console.log("Registering user:", values);

  // Basic validation
  if (!email || !name || !password) {
    return { error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { error: "Invalid email format." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error:
        "A confirmation email has already been sent. Please check your junk or spam folder.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  //const verificationToken = await generateVerificationToken(email);
  //await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Account created successfully! You may login.",
  };
};
