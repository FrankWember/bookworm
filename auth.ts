import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/connection";
import { getUserById } from "@/utils/user";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  events: {
    async linkAccount({ user }) {
      // Ensure the user's email is marked verified
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user!.id!);

      if (account?.provider !== "credentials") {
        return true;
      }
      if (account?.provider === "credentials") {
        // For credentials login, check if the email is verified
        if (!existingUser?.emailVerified) return false;
      }

      return true; //
    },

    async session({ session, token }) {
      console.log("Session Token:", token);

      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).role = token.role; // if you added `role` to the token
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      token.role = user.roles;
      return token;
    },
  },
  ...authConfig,
});
