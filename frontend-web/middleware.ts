import { NextResponse } from "next/server";

import type { NextAuthRequest } from "next-auth";

import { UserRole } from "./graphql/generated/schema";
import { auth } from "./lib/auth";
import { ROUTES } from "./lib/constants";

export default auth((req: NextAuthRequest) => {
  const { auth: session, nextUrl } = req;
  const isLoggedIn = !!session?.user;
  const isAdmin = isLoggedIn && session?.user?.role === UserRole.Admin;

  // Define route categories
  const authRoutes = [
    ROUTES.account.login,
    ROUTES.account.register,
    ROUTES.account.userVerify,
  ] as const;

  const isAuthRoute = authRoutes.includes(
    nextUrl.pathname as (typeof authRoutes)[number],
  );
  const isPublicRoute = isAuthRoute || ROUTES.landing === nextUrl.pathname;
  const isAdminRoute = nextUrl.pathname.startsWith(ROUTES.admin.startWith);

  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Handle authentication and authorization
  if (!isLoggedIn) {
    // If not logged in and trying to access protected route, redirect to login
    if (!isPublicRoute) {
      const url = new URL(ROUTES.account.login, nextUrl.origin);
      url.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  } else {
    // If logged in
    if (isAuthRoute) {
      // Redirect away from auth routes
      return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
    }

    if (isAdminRoute && !isAdmin) {
      // Redirect non-admin users away from admin routes
      return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
    }
  }

  return NextResponse.next();
});

// Update matcher to exclude auth-related paths and static files
export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - public folder
  //    * - api/auth (auth endpoints)
  //    */
  //   "/((?!_next/static|_next/image|favicon.ico|public|api/).*)",
  //   "/p/:path*",
  // ],

  matcher: ["/((?!.*\\..*|_next).*)", "/p/:path*", "/(api|trpc)(.*)"],
};
