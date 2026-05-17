import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: unknown;
      role?: unknown;
    } & DefaultSession["user"];
  }

  interface User {
    role?: unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: unknown;
    role?: unknown;
  }
}
