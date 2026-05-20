import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/tasks", "/workspaces", "/notifications", "/admin"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const token = request.cookies.get("tm_access")?.value;

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/workspaces/:path*", "/notifications/:path*", "/admin/:path*"],
};
