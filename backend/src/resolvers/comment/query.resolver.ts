import {
  getPostCommentsOnCursorCtrl,
  getPostCommentsOnOffsetCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import { CursorParams, OffsetParams } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";

export const Query = {
  async postCommentsOnOffset(
    _: any,
    params: OffsetParams & { postId: string },
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnOffsetCtrl(prisma, params);
    return result;
  },
  async postCommentsOnCursor(
    _: any,
    params: CursorParams & { postId: string },
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnCursorCtrl(prisma, params);
    return result;
  },
};
