import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  // For admin routes (except login), check for auth cookie
  if (isAdminRoute && !isLoginRoute) {
    const token = request.cookies.get("authjs.session-token") ||
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If accessing login page and has auth cookie, redirect to dashboard
  if (isLoginRoute) {
    const token = request.cookies.get("authjs.session-token") ||
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

