import {
  getPostCommentsOnCursorCtrl,
  getPostCommentsOnOffsetCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import { CursorParams, OffsetParams, YogaContext } from "@/utils/types";

export const Query = {
  async postCommentsOnOffset(
    _: unknown,
    params: OffsetParams & { postId: string },
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnOffsetCtrl(prisma, params);
    return result;
  },
  async postCommentsOnCursor(
    _: unknown,
    params: CursorParams & { postId: string },
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnCursorCtrl(prisma, params);
    return result;
  },
};
