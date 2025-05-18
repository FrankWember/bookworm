"use server";
// This action is used to add an email to the waitlist
import { prisma } from "@/prisma/connection";

export const waitlist = async (email: string) => {
  if (!email) {
    return { error: "Please enter an Email to join the waitlist" };
  }
  if (!email.includes("@")) {
    return { error: "Invalid email format." };
  }

  const existEmail = await prisma.waitlist.findUnique({
    where: {
      email: email,
    },
  });
  if (existEmail) {
    return {
      error: "You have already been added to the waitlist.",
    };
  }
  await prisma.waitlist.create({
    data: {
      email: email,
    },
  });
  return {
    success: "You have been added to the waitlist!",
  };
};
