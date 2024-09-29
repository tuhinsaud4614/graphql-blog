import { NextResponse } from "next/server";

import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { UserRole } from "./graphql/generated/schema";
import { ROUTES } from "./lib/constants";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith(ROUTES.admin.startWith) &&
      request.nextauth.token &&
      request.nextauth.token.user?.role !== UserRole.Admin
    ) {
      const url = new URL(request.nextUrl.origin);
      url.pathname = ROUTES.landing;
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
    pages: { signIn: ROUTES.account.login },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/p/:path*", "/(api|trpc)(.*)"],
};
