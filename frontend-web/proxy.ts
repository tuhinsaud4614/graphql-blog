import { NextRequest, NextResponse } from "next/server";

import { UserRole } from "./graphql/generated/schema";
import { KEYS, ROUTES } from "./lib/constants";
import { isDev } from "./lib/isType";
import { fetchRefreshToken, getAuthUser } from "./lib/utils";

export default async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  let accessToken = req.cookies.get(KEYS.SESSION_KEYS.accessToken)?.value;
  let user = getAuthUser(accessToken);
  if (!user) {
    const refreshToken = req.cookies.get(KEYS.SESSION_KEYS.refreshToken)?.value;
    accessToken = (await fetchRefreshToken(refreshToken)) || undefined;
    user = getAuthUser(accessToken);
  }

  // const session = await getSession(req);
  // const user = getAuthUser(session?.accessToken);
  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user?.role === UserRole.Admin;

  // Define route categories
  const authRoutes = [
    ROUTES.account.login,
    ROUTES.account.register,
    ROUTES.account.userVerify,
  ] as const;

  const publicRoutes = [
    ROUTES.landing,
    ROUTES.account.success,
    ROUTES.account.failure,
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
    const response = NextResponse.next();
    if (user && accessToken) {
      const now = Math.floor(Date.now() / 1000);
      const exp = user.exp; // JWT exp in seconds
      const maxAge = Math.max(exp - now, 0);
      response.cookies.set(KEYS.SESSION_KEYS.accessToken, accessToken, {
        httpOnly: true,
        secure: !isDev(),
        sameSite: "lax",
        maxAge,
      });
      return response;
    }
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
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(KEYS.SESSION_KEYS.accessToken);
      response.cookies.delete(KEYS.SESSION_KEYS.refreshToken);
      return response;
    }

    const response = NextResponse.next();
    response.cookies.delete(KEYS.SESSION_KEYS.accessToken);
    response.cookies.delete(KEYS.SESSION_KEYS.refreshToken);
    return NextResponse.next();
  }

  // Logic for authenticated users
  if (isLoggedIn) {
    // Redirect away from auth routes when already logged in
    if (isAuthRoute) {
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");

      // Validate callback URL to prevent open redirects
      if (callbackUrl && isValidCallbackUrl(callbackUrl, nextUrl.origin)) {
        const response = NextResponse.redirect(
          new URL(callbackUrl, nextUrl.origin),
        );
        if (user && accessToken) {
          const now = Math.floor(Date.now() / 1000);
          const exp = user.exp; // JWT exp in seconds
          const maxAge = Math.max(exp - now, 0);
          response.cookies.set(KEYS.SESSION_KEYS.accessToken, accessToken, {
            httpOnly: true,
            secure: !isDev(),
            sameSite: "lax",
            maxAge,
          });
        }
        return response;
      }

      const response = NextResponse.redirect(
        new URL(ROUTES.landing, nextUrl.origin),
      );
      if (user && accessToken) {
        const now = Math.floor(Date.now() / 1000);
        const exp = user.exp; // JWT exp in seconds
        const maxAge = Math.max(exp - now, 0);
        response.cookies.set(KEYS.SESSION_KEYS.accessToken, accessToken, {
          httpOnly: true,
          secure: !isDev(),
          sameSite: "lax",
          maxAge,
        });
      }
      return response;
    }

    // Admin route protection
    if (isAdminRoute && !isAdmin) {
      const response = NextResponse.redirect(
        new URL(ROUTES.landing, nextUrl.origin),
      );
      // You could redirect to an unauthorized page instead
      if (user && accessToken) {
        const now = Math.floor(Date.now() / 1000);
        const exp = user.exp; // JWT exp in seconds
        const maxAge = Math.max(exp - now, 0);
        response.cookies.set(KEYS.SESSION_KEYS.accessToken, accessToken, {
          httpOnly: true,
          secure: !isDev(),
          sameSite: "lax",
          maxAge,
        });
      }
      return response;
    }
  }

  const response = NextResponse.next();
  if (user && accessToken) {
    const now = Math.floor(Date.now() / 1000);
    const exp = user.exp; // JWT exp in seconds
    const maxAge = Math.max(exp - now, 0);
    response.cookies.set(KEYS.SESSION_KEYS.accessToken, accessToken, {
      httpOnly: true,
      secure: !isDev(),
      sameSite: "lax",
      maxAge,
    });
  } else {
    response.cookies.delete(KEYS.SESSION_KEYS.accessToken);
    response.cookies.delete(KEYS.SESSION_KEYS.refreshToken);
  }
  return response;
}

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
  unstable_allowDynamic: ["**/node_modules/lodash/**"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/p/:path*", "/(api|trpc)(.*)"],
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
    "/p/:path*",
    "/(api|trpc)(.*)",
  ],
};
