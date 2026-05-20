import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/static") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const accessToken = req.cookies.get("tm_admin_access")?.value;
    const role = req.cookies.get("tm_admin_role")?.value;
    const loginUrl = new URL("/admin/login", req.url);
    const adminUrl = new URL("/admin", req.url);
    const dashboardUrl = new URL("/dashboard", req.url);

    if (!accessToken) {
      if (pathname === "/admin/login") return NextResponse.next();
      return NextResponse.redirect(loginUrl);
    }

    if (pathname !== "/admin/login" && role !== "admin") {
      return NextResponse.redirect(dashboardUrl);
    }

    if (pathname === "/admin/login" && role === "admin") {
      return NextResponse.redirect(adminUrl);
    }

    return NextResponse.next();
  }

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
