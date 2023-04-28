import type { AuthorStatus, Category, UserRole } from "@prisma/client";

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
  role: UserRole;
  authorStatus: AuthorStatus | null;
  avatar: IPicturePayload | null;
  about: string | null;
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
  categories: Category[];
  tags: ITagPayload[];
  reactionsBy: IUserPayload[];
  comments: ICommentPayload[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICursorPageInfo {
  hasNext: boolean;
  endCursor?: string | null;
}

export interface ICursorEdge<T> {
  cursor: string;
  node: T;
}

export interface IResponseWithCursor<T> {
  total: number;
  pageInfo: ICursorPageInfo;
  edges: ICursorEdge<T>[];
}

export interface IOffsetPageInfo {
  hasNext: boolean;
  nextPage: number;
  previousPage: number;
  totalPages: number;
}

export interface IResponseWithOffset<T> {
  data: T[];
  total: number;
  pageInfo?: IOffsetPageInfo;
}

export interface IReactionsCount {
  count: number;
  reacted: boolean;
}

export interface IErrorResponse {
  success: boolean;
  detail: string | null;
  message: string;
  error: string;
  timeStamp: string;
}

export interface ISuccessResponse {
  success: boolean;
  detail: string | null;
  message: string;
  data: any;
  timeStamp: string;
}

export interface IVerifyResetPassword {
  code: string;
  hash: string;
}

export interface IExtensionsWithAuthorization {
  headers: {
    Authorization?: string;
  };
}
