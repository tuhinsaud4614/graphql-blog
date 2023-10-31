import _has from "lodash/has";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import credentials from "next-auth/providers/credentials";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/graphql/generated/schema";
import { getClient } from "@/lib/apolloClient";
import { IAuthUser } from "@/lib/types";
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
            };
          }
          return null;
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return user;
      }

      if (
        _has(token, "user") &&
        _has(token.user, "exp") &&
        token.user.exp &&
        Date.now() < token.user.exp * 1000
      ) {
        return token;
      }

      const accessToken = await fetchRefreshToken(token.refreshToken as string);
      const updatedUser = getAuthUser(accessToken);
      if (accessToken && updatedUser) {
        return { ...token, user: updatedUser, accessToken };
      }

      return {
        ...token,
        error: "RefreshTokenTokenError",
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user as IAuthUser;
        session.accessToken = token.accessToken as string;
        session.expires = new Date(token.user.exp * 1000).toISOString();
        session.error = token.error as string | undefined;
      }
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/account/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
