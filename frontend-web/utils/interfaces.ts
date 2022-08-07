import { EmptyText } from "components/PostEditor/utils";
import { Descendant } from "slate";
import { EAuthorStatus, EUserRole } from "./enums";

export interface IAnchorOrigin {
  horizontal?: "center" | "right" | "left";
  vertical?: "bottom" | "top";
}

export interface SlateVideoElement {
  type: "video";
  url: string;
  children: EmptyText[];
}

export interface SlateLinkElement {
  type: "link";
  url: string;
  children: Descendant[];
}

export interface IPicture {
  id: string;
  height: number;
  width: number;
  url: string;
}

export interface IUser {
  about: null | string;
  authorStatus: null | EAuthorStatus;
  avatar: null | IPicture;
  email: string;
  exp: number;
  iat: number;
  id: string;
  mobile: string;
  name: string;
  role: EUserRole;
}
