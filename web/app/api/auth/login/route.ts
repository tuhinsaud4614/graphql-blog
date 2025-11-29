import { NextResponse } from "next/server";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables
} from "@/graphql/generated/schema/graphql";
import { getClient } from "@/lib/apolloClient";
import { KEYS } from "@/lib/constants";
import { getAuthUser } from "@/lib/utils";
import { Session } from "@/dto/user.dto";
import { isDev } from "@/lib/utils/isType";

export type LoginSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  user: Session["user"];
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { data } = await getClient().mutate<
      LoginMutation,
      LoginMutationVariables
    >({
      mutation: LoginDocument,
      variables: {
        email: (email as string) ?? "",
        password: (password as string) ?? "",
      },
    });
    const user = getAuthUser(data?.login.accessToken);
    if (user && data?.login) {
      const res = NextResponse.json(
        {
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
          user: user,
        },
        { headers: { "Cache-Control": "no-store" } },
      );

      const now = Math.floor(Date.now() / 1000);
      const exp = user.exp; // JWT exp in seconds
      const maxAge = Math.max(exp - now, 0);
      res.cookies.set(KEYS.SESSION_KEYS.accessToken, data.login.accessToken, {
        httpOnly: true,
        secure: !isDev(),
        sameSite: "lax",
        maxAge,
      });

      return res;
    }
    return NextResponse.json(null);
  } catch (error) {
    console.log("error", error);
    NextResponse.json(null);
  }
}
