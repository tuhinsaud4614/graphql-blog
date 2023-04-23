import { YogaInitialContext } from "graphql-yoga";

import type { Request, Response } from "express";
import type { InferType } from "yup";

import {
  cursorParamsSchema,
  idParamsSchema,
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
  verifyUserSchema,
} from "@/validations/user";

import createContext from "./context";

export type YogaContextType = YogaInitialContext & {
  req: Request;
  res: Response;
};

export type YogaContext = ReturnType<typeof createContext>;

export type CursorParams = InferType<typeof cursorParamsSchema>;
export type OffsetParams = InferType<typeof offsetParamsSchema>;

// Common
export type IDParams = InferType<typeof idParamsSchema>;

// User Type
export type RegisterInput = InferType<typeof registerSchema>;
export type LoginInput = InferType<typeof loginSchema>;
export type ResetPasswordInput = InferType<typeof resetPasswordSchema>;
export type VerifyUserParams = InferType<typeof verifyUserSchema>;

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
