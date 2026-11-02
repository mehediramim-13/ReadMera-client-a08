import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/add-book", "/my-books", "/my-borrows", "/profile"];

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivate =
    PRIVATE_ROUTES.some((route) => path === route || path.startsWith(`${route}/`)) ||
    (path.startsWith("/books/") && path !== "/books/");
  if (!isPrivate || getSessionCookie(request)) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", path);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/books/:path*",
  ],
};
