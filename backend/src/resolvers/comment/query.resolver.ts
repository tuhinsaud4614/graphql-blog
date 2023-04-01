import {
  getPostCommentsOnCursorCtrl,
  getPostCommentsOnOffsetCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import { ICursorQueryParams, IOffsetQueryParams } from "@/utils/interfaces";
import { YogaContextReturnType } from "@/utils/types";

export const Query = {
  async postCommentsOnOffset(
    _: any,
    params: IOffsetQueryParams & { postId: string },
    { prisma, user }: YogaContextReturnType,
    ___: any
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnOffsetCtrl(prisma, params);
    return result;
  },
  async postCommentsOnCursor(
    _: any,
    params: ICursorQueryParams & { postId: string },
    { prisma, user }: YogaContextReturnType,
    ___: any
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getPostCommentsOnCursorCtrl(prisma, params);
    return result;
  },
};
