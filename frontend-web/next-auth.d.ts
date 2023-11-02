/** For improve type suggestion  https://next-auth.js.org/getting-started/typescript */
import { DefaultSession, DefaultUser } from "next-auth";

import { IAuthUser } from "./lib/types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IAuthUser;
    accessToken: string;
    refreshToken: string;
    error?: string;
  }

  interface User extends DefaultUser {
    user: IAuthUser;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IAuthUser;
    accessToken: string;
    refreshToken: string;
  }
}
