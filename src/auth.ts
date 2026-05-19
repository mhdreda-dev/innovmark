import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getPrisma } from "@/lib/cms/prisma";

function getAuthSecret() {
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET;
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.NODE_ENV !== "production") return "innovmark-local-development-secret";
  return undefined;
}

function normalizeEmail(email: unknown) {
  return String(email ?? "").toLowerCase().trim();
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: getAuthSecret(),
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
          name: user.name ?? "Innovmark Admin",
          role: "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log("JWT CALLBACK USER:", !!user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      console.log("SESSION CALLBACK TOKEN ROLE:", token.role);
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
