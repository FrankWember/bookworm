import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${NEXTAUTH_URL}/auth/new-verification?token=${token}`;
  console.log("Sending verification email to:", email);
  await resend.emails.send({
    from: "Bookworm@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  console.log("Sending password reset email to:", email);
  await resend.emails.send({
    from: "Bookworm@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};
