import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isAdminRole(role: unknown) {
  return String(role ?? "").toUpperCase() === "ADMIN";
}

function authSecret() {
  return process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? (process.env.NODE_ENV !== "production" ? "innovmark-local-development-secret" : undefined);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    const token = await getToken({ req: request, secret: authSecret() });
    if (isAdminRole(token?.role)) {
      return NextResponse.redirect(new URL("/admin/content/home", request.url));
    }
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: authSecret() });
  if (!isAdminRole(token?.role)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
