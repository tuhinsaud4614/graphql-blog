import type {
  Category,
  Comment,
  Picture,
  Post,
  Tag,
  User,
} from "@prisma/client";
import { EAuthorStatus, EUserRole } from "./enums";
import { YogaContextReturnType } from "./types";

export interface IPicture extends Picture {}

export interface IUser extends User {}

export interface ICategory extends Category {}

export interface IComment extends Comment {}

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

export interface ICreatePostInput {
  title: string;
  image: File;
  categories: string[];
  published: boolean;
  content: string;
  tags: string[];
}

export interface IUpdatePostInput {
  id: string;
  title?: string;
  image?: File;
  categories?: string[];
  published?: boolean;
  content?: string;
  tags?: string[];
}

// Payload
export interface IPicturePayload {
  id: string;
  height: number;
  width: number;
  url: string;
}
export interface IUserFollow {
  id: string;
  name: string | null;
  mobile: string;
  email: string;
  avatar: null | IPicturePayload;
}
export interface IUserPayload {
  id: string;
  name: string | null;
  mobile: string;
  email: string;
  role: EUserRole;
  authorStatus: EAuthorStatus | null;
  avatar: IPicturePayload | null;
  about: string | null;
  followers: IUserFollow[];
  followings: IUserFollow[];
}

export interface ICategoryPayload {
  id: string;
  title: string;
  posts: IPostPayload[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagPayload {
  id: string;
  title: string;
  posts: IPostPayload[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentPayload {
  id: string;
  content: string;
  commenter: IUserPayload;
  post: IPostPayload;
  replies: ICommentPayload[];
  parentComment: ICommentPayload | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostPayload {
  id: string;
  title: string;
  image: IPicturePayload | null;
  published: boolean;
  publishedAt: Date | null;
  content: string;
  categories: ICategory[];
  tags: ITagPayload[];
  reactionsBy: IUserPayload[];
  comments: ICommentPayload[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageInfo {
  total: number;
  hasNext: boolean;
  nextPage: number;
  previousPage: number;
  totalPages: number;
}

export interface IPostsQueryParams {
  role: string;
  limit?: number;
  page?: number;
}

export interface IPostsByTagQueryParams {
  role: string;
  tag: string;
  limit?: number;
  page?: number;
}

export interface ICommentsQueryParams {
  postId: string;
  limit?: number;
  page?: number;
}
