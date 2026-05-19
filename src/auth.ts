import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getPrisma } from "@/lib/cms/prisma";

function normalizeEmail(email: unknown) {
  return String(email ?? "").toLowerCase().trim();
}

export const authOptions: NextAuthOptions & { trustHost: true } = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Innovmark Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = normalizeEmail(credentials?.email);
        const password = String(credentials?.password ?? "");
        const prisma = getPrisma();

        console.log("LOGIN EMAIL:", email);

        if (!email || !password || !prisma) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("USER FOUND:", !!user);
        console.log("HAS HASH:", !!user?.passwordHash);

        if (!user || !user.isActive) {
          return null;
        }

        const passwordMatches = await compare(password, user.passwordHash);
        if (!passwordMatches) {
          return null;
        }

        console.log("AUTHORIZE SUCCESS:", user.email);

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT CALLBACK USER:", !!user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION CALLBACK TOKEN ROLE:", token.role);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
