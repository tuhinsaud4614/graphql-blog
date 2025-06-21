import { CredentialsSignin, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/graphql/generated/schema";

import { getClient } from "./apolloClient";
import { getAuthUser } from "./utils";

class CustomAuthError extends CredentialsSignin {
  constructor(message: string, errorOptions?: any) {
    super(message, errorOptions);
    this.name = "CustomAuthError";
  }
}

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
          console.log("error", error);
          throw new CustomAuthError((error as Error).message);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
