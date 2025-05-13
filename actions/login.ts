"use server";

import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: "Invalid credentials!" };
  }

  return {
    success: "Login success!",
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    },
  };
};
