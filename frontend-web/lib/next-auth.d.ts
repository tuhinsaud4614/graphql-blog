import { IAuthUser } from "./types";

declare module "next-auth" {
  interface Session {
    user: IAuthUser;
    accessToken: string;
    error?: string;
  }
}
