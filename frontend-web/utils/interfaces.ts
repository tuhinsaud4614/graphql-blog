import { EmptyText } from "components/PostEditor/utils";
import {
  AuthorStatus,
  FUserFragment,
  FollowingMutationStatus,
  UserRole,
} from "graphql/generated/schema";
import { Descendant } from "slate";

import { NotificationType } from "@/utils/types";

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

export interface IFollowingNotification {
  type: NotificationType;
  followedBy: FUserFragment;
  mutation: FollowingMutationStatus;
}
