import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Use the cached prisma client
import authConfig from "./auth.config";

let cachedSession = null;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      console.log("SESSION TOKEN", { token });
      session = token;
      session.lastLoginTime = new Date();
      console.log("SESSION", { session });
      return token;
    },

    async jwt({ token }) {
      console.log({ token });

      if (cachedSession && cachedSession.userId === token.sub) {
        return cachedSession;
      }

      const userId = token.sub;
      if (userId) {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (user.provider !== "Credentials") {
          const account = await prisma.account.findFirst({
            where: {
              userId: userId,
            },
          });
          if (account) {
            user.provider = account.provider;
            if (account.provider === "google") {
              user.fromGoogle = true;
            }
          }
        }
        token.provider = user.provider;
        token.emailVerified = user.emailVerified;
        token.fromGoogle = user.fromGoogle;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;

        cachedSession = token; // Cache the session data
      }

      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      console.log("LINK ACCOUNT", { user });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: user.emailVerified ? user.emailVerified : new Date(),
          history: {
            push: new Date(),
          },
        },
      });
    },
  },
});
