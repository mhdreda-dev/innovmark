import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "innovmark-local-development-secret",
  providers: [
    Credentials({
      name: "Innovmark Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        const allowed = adminEmails();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!email || !password || !adminPassword || !allowed.includes(email)) {
          return null;
        }

        if (password !== adminPassword) {
          return null;
        }

        return { id: email, email, name: "Innovmark Admin", role: "admin" };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
