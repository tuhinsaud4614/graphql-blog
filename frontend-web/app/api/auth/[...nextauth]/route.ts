import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/graphql/generated/schema";
import { getClient } from "@/lib/apolloClient";
import { ROUTES } from "@/lib/constants";
import { isDev, isProduction } from "@/lib/isType";
import { UpdateSessionParams } from "@/lib/updateSession";
import { fetchRefreshToken, getAuthUser } from "@/lib/utils";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        emailOrMobile: { type: "string" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await getClient().mutate<
            LoginMutation,
            LoginMutationVariables
          >({
            mutation: LoginDocument,
            variables: {
              emailOrMobile: credentials?.emailOrMobile || "",
              password: credentials?.password || "",
            },
          });

          const user = getAuthUser(data?.login.accessToken);
          if (user && data?.login) {
            return {
              accessToken: data.login.accessToken,
              refreshToken: data.login.refreshToken,
              user: user,
            } as User;
          }
          return null;
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: user.user,
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

      if (token.user.exp && Date.now() < token.user.exp * 1000) {
        return token;
      }

      const accessToken = await fetchRefreshToken(token.refreshToken);
      const updatedUser = getAuthUser(accessToken);
      if (accessToken && updatedUser) {
        return { ...token, user: updatedUser, accessToken } as JWT;
      }

      return {
        ...token,
        error: "RefreshTokenTokenError",
      } as JWT;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expires = new Date(token.user.exp * 1000).toISOString();
        session.error = token.error as string | undefined;
      }
      return Promise.resolve(session);
    },
  },
  pages: { signIn: ROUTES.login },
  secret: process.env.NEXTAUTH_SECRET,
  debug: isDev(),
  useSecureCookies: isProduction(),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
