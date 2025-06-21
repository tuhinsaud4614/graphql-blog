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

  const publicRoutes = [
    ROUTES.landing,
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/help",
    // Add more public routes as needed
  ] as const;

  const publicDynamicPatterns = [
    /^\/p\/[^\/]+$/, // /p/:id (single level only, not /p/user or /p/admin)
  ];

  const isAuthRoute = authRoutes.includes(
    nextUrl.pathname as (typeof authRoutes)[number],
  );

  const isPublicRoute =
    isAuthRoute ||
    publicRoutes.includes(nextUrl.pathname as (typeof publicRoutes)[number]) ||
    publicDynamicPatterns.some((pattern) => pattern.test(nextUrl.pathname));

  const isAdminRoute = nextUrl.pathname.startsWith(ROUTES.admin.startWith);
  // const isUserProtectedRoute = !isPublicRoute && !isAdminRoute;

  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    if (!isPublicRoute) {
      const loginUrl = new URL(ROUTES.account.login, nextUrl.origin);

      // Only add callbackUrl for non-auth routes to avoid loops
      if (!isAuthRoute) {
        loginUrl.searchParams.set(
          "callbackUrl",
          nextUrl.pathname + nextUrl.search,
        );
      }

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Logic for authenticated users
  if (isLoggedIn) {
    // Redirect away from auth routes when already logged in
    if (isAuthRoute) {
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");

      // Validate callback URL to prevent open redirects
      if (callbackUrl && isValidCallbackUrl(callbackUrl, nextUrl.origin)) {
        return NextResponse.redirect(new URL(callbackUrl, nextUrl.origin));
      }

      return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
    }

    // Admin route protection
    if (isAdminRoute && !isAdmin) {
      // You could redirect to an unauthorized page instead
      return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
    }
  }

  return NextResponse.next();

  // // Handle authentication and authorization
  // if (!isLoggedIn) {
  //   // If not logged in and trying to access protected route, redirect to login
  //   if (!isPublicRoute) {
  //     const url = new URL(ROUTES.account.login, nextUrl.origin);
  //     url.searchParams.set("callbackUrl", nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  // } else {
  //   // If logged in
  //   if (isAuthRoute) {
  //     // Redirect away from auth routes
  //     return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
  //   }

  //   if (isAdminRoute && !isAdmin) {
  //     // Redirect non-admin users away from admin routes
  //     return NextResponse.redirect(new URL(ROUTES.landing, nextUrl.origin));
  //   }
  // }

  // return NextResponse.next();
});

function isValidCallbackUrl(callbackUrl: string, origin: string): boolean {
  try {
    const url = new URL(callbackUrl, origin);

    // Only allow same-origin redirects
    if (url.origin !== origin) {
      return false;
    }

    // Prevent redirects to auth routes to avoid loops
    const authPaths = [
      ROUTES.account.login,
      ROUTES.account.register,
      ROUTES.account.userVerify,
    ];
    if (authPaths.some((path) => url.pathname.startsWith(path))) {
      return false;
    }

    // Add more validation rules as needed
    return true;
  } catch {
    return false;
  }
}

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
  unstable_allowDynamic: ["**/node_modules/lodash/**"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/p/:path*", "/(api|trpc)(.*)"],
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
    "/p/:path*",
    "/(api|trpc)(.*)",
  ],
};
