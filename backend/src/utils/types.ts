import { YogaInitialContext } from "graphql-yoga";

import type { User } from "@prisma/client";
import type { Request, Response } from "express";
import type { InferType } from "yup";

import {
  cursorParamsSchema,
  fileParamsSchema,
  idParamsSchema,
  imageParamsSchema,
  offsetParamsSchema,
} from "@/validations";
import {
  categoriesByTextSchema,
  categoryCreationSchema,
  categoryModificationSchema,
} from "@/validations/category";
import {
  createCommentSchema,
  postCommentsCursorParamsSchema,
  postCommentsParamsSchema,
  updateCommentSchema,
} from "@/validations/comment";
import {
  createPostSchema,
  postReactedBySchema,
  postsByTagSchema,
  updatePostSchema,
} from "@/validations/post";
import { tagsByTextWithOffsetSchema } from "@/validations/tag";
import {
  authorIdWithCursorSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateAboutSchema,
  updateNameSchema,
  verifyCodeSchema,
  verifyUserSchema,
} from "@/validations/user";

import createContext from "./context";
import type { PicturePayload } from "./interfaces";

export type YogaContextType = YogaInitialContext & {
  req: Request;
  res: Response;
};
export type YogaContext = ReturnType<typeof createContext>;

export type CursorParams = InferType<typeof cursorParamsSchema>;
export type OffsetParams = InferType<typeof offsetParamsSchema>;
export type IDParams = InferType<typeof idParamsSchema>;
export type ImageParams = InferType<typeof imageParamsSchema>;
export type FileParams = InferType<typeof fileParamsSchema>;

// User Type
export type UserWithAvatar = User & {
  avatar: PicturePayload | null;
};
export type RegisterInput = InferType<typeof registerSchema>;
export type LoginInput = InferType<typeof loginSchema>;
export type ResetPasswordInput = InferType<typeof resetPasswordSchema>;
export type VerifyCodeParams = InferType<typeof verifyCodeSchema>;
export type VerifyUserParams = InferType<typeof verifyUserSchema>;
export type UpdateNameParams = InferType<typeof updateNameSchema>;
export type UpdateAboutParams = InferType<typeof updateAboutSchema>;
export type AuthorIdWithCursorParams = InferType<
  typeof authorIdWithCursorSchema
>;

// Post Type
export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type PostsByTagOffsetParams = InferType<typeof postsByTagSchema>;
export type PostReactedByCursorParams = InferType<typeof postReactedBySchema>;

// Category
export type CategoriesByTextParams = InferType<typeof categoriesByTextSchema>;
export type CategoryCreationParams = InferType<typeof categoryCreationSchema>;
export type CategoryModificationParams = InferType<
  typeof categoryModificationSchema
>;

// Tag
export type TagsByTextWithOffsetParams = InferType<
  typeof tagsByTextWithOffsetSchema
>;

// Comment
export type CreateCommentInput = InferType<typeof createCommentSchema>;
export type UpdateCommentInput = InferType<typeof updateCommentSchema>;
export type PostCommentsParams = InferType<typeof postCommentsParamsSchema>;
export type PostCommentsCursorParams = InferType<
  typeof postCommentsCursorParamsSchema
>;
