import { YogaInitialContext } from "@graphql-yoga/node";

import { IncomingMessage, ServerResponse } from "http";
import type { InferType } from "yup";

import { cursorParamsSchema, offsetParamsSchema } from "@/validations";
import {
  createPostSchema,
  getAllPostsByTagSchema,
  updatePostSchema,
} from "@/validations/post.validation";

import createContext from "./context";

export type YogaContextType = YogaInitialContext & {
  req: IncomingMessage;
  res: ServerResponse;
};

export type YogaContext = ReturnType<typeof createContext>;

export type CursorParams = InferType<typeof cursorParamsSchema>;
export type OffsetParams = InferType<typeof offsetParamsSchema>;

/* Posts Type */
export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type TaggedPostCursorParams = InferType<typeof getAllPostsByTagSchema>;
