import type {
  Category,
  Picture,
  Post,
  Profile,
  Tag,
  User,
} from "@prisma/client";
import { EUserRole } from "./enums";
import { YogaContextReturnType } from "./types";

export interface IPicture extends Picture {}

export interface IProfile extends Profile {}

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

// Mutation Input Interface
export interface IRegisterUserInput {
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  name?: string;
  role: EUserRole.Author | EUserRole.User;
}
