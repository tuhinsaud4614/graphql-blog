import { GraphQLYogaError } from "@graphql-yoga/node";
import { getPostCommentsOnOffsetCtrl } from "../../controller/comment.controller";
import { UN_AUTH_ERR_MSG, UN_AUTH_EXT_ERR_CODE } from "../../utils/constants";
import { IOffsetQueryParams } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async postCommentsOnOffset(
    _: any,
    params: IOffsetQueryParams & { postId: string },
    { prisma, user }: YogaContextReturnType,
    ___: any
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await getPostCommentsOnOffsetCtrl(prisma, params);
    return result;
  },
};
