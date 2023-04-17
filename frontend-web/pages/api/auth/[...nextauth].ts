import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/graphql/generated/schema";
import { initializeApollo } from "@/lib/apollo";
import { getAuthUser } from "@/utils";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        emailMobile: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { emailMobile, password } = credentials;

        const client = initializeApollo();
        try {
          const { data } = await client.mutate<
            LoginMutation,
            LoginMutationVariables
          >({
            mutation: LoginDocument,
            variables: { emailOrMobile: emailMobile, password },
          });

          if (!data) {
            return null;
          }
          const token = data.login;
          const user = getAuthUser(token);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
