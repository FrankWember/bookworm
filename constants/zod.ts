import * as z from "zod";

export const EmailSignInSchema = z.object({
  email: z
    .string({ required_error: "You must have an email" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "You must use a password" })
    .min(8, "Minimum 8 characters required!"),
  code: z.optional(z.string()),
});
