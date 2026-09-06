import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "specforge_session";

const PROTECTED_ROUTES = ["/issues"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If trying to access protected route without session cookie, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth pages (login/register) with active session cookie, redirect to issues
  if (isAuthRoute && sessionCookie) {
    const issuesUrl = new URL("/issues", request.url);
    return NextResponse.redirect(issuesUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/issues/:path*",
    "/login",
    "/register",
  ],
};
