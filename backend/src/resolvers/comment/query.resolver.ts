import { GraphQLYogaError } from "@graphql-yoga/node";
import { getAllCommentsCtrl } from "../../controller/comment.controller";
import { UN_AUTH_ERR_MSG } from "../../utils/constants";
import { ICommentsQueryParams } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async comments(
    _: any,
    params: ICommentsQueryParams,
    { prisma, user }: YogaContextReturnType,
    ___: any
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }
    const result = await getAllCommentsCtrl(prisma, params);
    return result;
  },
};
