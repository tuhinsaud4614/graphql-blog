import type { Session, User } from "next-auth";
import NextAuth from "next-auth";

import { isDev, isProduction } from "@/lib/isType";
import { UpdateSessionParams } from "@/lib/updateSession";
import { fetchRefreshToken, getAuthUser } from "@/lib/utils";

import authConfig from "./auth.config";
import { REFRESH_TOKEN_ERROR, ROUTES } from "./constants";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          accessToken: (user as User).accessToken,
          refreshToken: (user as User).refreshToken,
          user: (user as User).user,
        };
      }

      if (trigger === "update" && session) {
        const newInfo = session as UpdateSessionParams;
        if (newInfo.accessToken) {
          const newUser = getAuthUser(newInfo.accessToken);
          token.accessToken = newInfo.accessToken;
          newUser && (token.user = newUser);
        } else {
          newInfo.name && (token.user.name = newInfo.name);
          newInfo.avatar && (token.user.avatar = newInfo.avatar);
        }
      }

      if (token.user.exp * 1000 > Date.now()) {
        return token;
      }

      const accessToken = await fetchRefreshToken(token.refreshToken);

      if (accessToken) {
        return { ...token, accessToken };
      }
      return {
        ...token,
        error: REFRESH_TOKEN_ERROR,
      };
    },
    async session({ session, token }) {
      const newSession = session as Session;
      if (token) {
        newSession.user = token.user;
        newSession.accessToken = token.accessToken;
        newSession.expires = new Date(
          token.user.exp * 1000,
        ) as unknown as Date & string;
        newSession.error = token.error;
      }
      return Promise.resolve(newSession);
    },
  },
  pages: { signIn: ROUTES.account.login, error: ROUTES.account.login },
  secret: process.env.NEXTAUTH_SECRET,
  debug: isDev(),
  useSecureCookies: isProduction(),
});
