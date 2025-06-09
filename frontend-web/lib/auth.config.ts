import { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/graphql/generated/schema";

import { getClient } from "./apolloClient";
import { getAuthUser } from "./utils";

export default {
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
              emailOrMobile: (credentials?.emailOrMobile as string) ?? "",
              password: (credentials?.password as string) ?? "",
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
          return Promise.reject(error as Error);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
