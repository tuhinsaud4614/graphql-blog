import { AuthorStatus, UserRole } from "@/graphql/generated/schema";

export interface IAnchorOrigin {
  horizontal?: "center" | "right" | "left";
  vertical?: "bottom" | "top";
}

export type ColorVariantType =
  | "primary"
  | "secondary"
  | "accent"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "neutral";

export type ButtonModeType = "outline" | "fill" | "text";

export interface IPicture {
  id: string;
  height: number;
  width: number;
  url: string;
}

export interface IUser {
  about: null | string;
  authorStatus: AuthorStatus | null;
  avatar: null | IPicture;
  email: string;
  exp: number;
  iat: number;
  id: string;
  mobile: string;
  name?: string | null;
  role: UserRole;
}
