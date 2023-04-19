import { YogaInitialContext } from "graphql-yoga";

import type { Request, Response } from "express";
import type { InferType } from "yup";

import { cursorParamsSchema, offsetParamsSchema } from "@/validations";
import {
  createPostSchema,
  getAllPostsByTagSchema,
  updatePostSchema,
} from "@/validations/post.validation";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/validations/user.validation";

import createContext from "./context";

export type YogaContextType = YogaInitialContext & {
  req: Request;
  res: Response;
};

export type YogaContext = ReturnType<typeof createContext>;

export type CursorParams = InferType<typeof cursorParamsSchema>;
export type OffsetParams = InferType<typeof offsetParamsSchema>;

/* User Type */
export type RegisterInput = InferType<typeof registerSchema>;
export type LoginInput = InferType<typeof loginSchema>;
export type ResetPasswordInput = InferType<typeof resetPasswordSchema>;

/* Post Type */
export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type TaggedPostCursorParams = InferType<typeof getAllPostsByTagSchema>;
