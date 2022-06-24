import type { Category, Picture, Post, Tag, User } from "@prisma/client";
import { EAuthorStatus, EUserRole } from "./enums";
import { YogaContextReturnType } from "./types";

export interface IPicture extends Picture {}

export interface IUser extends User {}

export interface ICategory extends Category {}

export interface IPost extends Post {}

export interface ITag extends Tag {}

export type IResolver = (
  parent: any,
  args: any,
  context: YogaContextReturnType,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: IResolver,
  parent: any,
  args: any,
  context: YogaContextReturnType,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: IResolver;
  };
}

export interface IPicturePayload {
  id: string;
  height: number;
  width: number;
  url: string;
}

export interface IUserPayload {
  id: string;
  name: string | null;
  mobile: string;
  email: string;
  role: EUserRole;
  authorStatus: EAuthorStatus | null;
  slug: string;
  avatar: IPicturePayload | null;
  about: string | null;
}

// Mutation Input Interface
export interface IRegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  name?: string;
  role: EUserRole.Author | EUserRole.User;
}

export interface ILoginInput {
  emailOrMobile: string;
  password: string;
}
