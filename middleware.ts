import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isAdminToken(token: Awaited<ReturnType<typeof getToken>>) {
  if (!token || typeof token !== "object") return false;
  return String(token.role ?? "").toUpperCase() === "ADMIN";
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (isAdminToken(token)) {
      return NextResponse.redirect(new URL("/admin/content/home", req.url));
    }

    return NextResponse.next();
  }

  const protectedRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/content");

  if (!protectedRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isAdminToken(token)) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
