import { GraphQLError } from "graphql";
import { YogaInitialContext } from "graphql-yoga";

import type { User } from "@prisma/client";
import type { Request, Response } from "express";
import type { InferType } from "yup";

import {
  cursorParamsSchema,
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
  createPostSchema,
  getAllPostsByTagSchema,
  updatePostSchema,
} from "@/validations/post.validation";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateAboutSchema,
  updateNameSchema,
  verifyCodeSchema,
  verifyUserSchema,
} from "@/validations/user";

import createContext from "./context";

export type YogaContextType = YogaInitialContext & {
  req: Request;
  res: Response;
};
export type YogaContext = ReturnType<typeof createContext>;

export type FileFilterFunction = (
  file: File,
  cb: (error: GraphQLError | null, valid?: boolean) => void,
) => void;

export type CursorParams = InferType<typeof cursorParamsSchema>;
export type OffsetParams = InferType<typeof offsetParamsSchema>;
export type IDParams = InferType<typeof idParamsSchema>;
export type ImageParams = InferType<typeof imageParamsSchema>;

// User Type
export type UserWithAvatar = User & {
  avatar: {
    id: string;
    height: number;
    width: number;
    url: string;
  } | null;
};
export type RegisterInput = InferType<typeof registerSchema>;
export type LoginInput = InferType<typeof loginSchema>;
export type ResetPasswordInput = InferType<typeof resetPasswordSchema>;
export type VerifyCodeParams = InferType<typeof verifyCodeSchema>;
export type VerifyUserParams = InferType<typeof verifyUserSchema>;
export type UpdateNameParams = InferType<typeof updateNameSchema>;
export type UpdateAboutParams = InferType<typeof updateAboutSchema>;

// Post Type
export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type TaggedPostCursorParams = InferType<typeof getAllPostsByTagSchema>;

// Category
export type CategoriesByTextParams = InferType<typeof categoriesByTextSchema>;
export type CategoryCreationParams = InferType<typeof categoryCreationSchema>;
export type CategoryModificationParams = InferType<
  typeof categoryModificationSchema
>;
