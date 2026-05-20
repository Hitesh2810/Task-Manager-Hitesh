import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public assets and api routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/public") || pathname.startsWith("/static") || pathname === "/") {
    return NextResponse.next();
  }

  // Admin routes require admin access cookie
  if (pathname.startsWith("/admin")) {
    const adminToken = req.cookies.get("tm_admin_access")?.value;
    if (!adminToken && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Protect application routes
  const protectedPaths = ["/dashboard", "/tasks", "/workspaces", "/notifications", "/profile"];
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("tm_access")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/tasks/:path*", "/workspaces/:path*", "/notifications/:path*", "/profile/:path*"],
};
