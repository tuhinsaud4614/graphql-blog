import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import { createCommentCtrl } from "../../controller/comment.controller";
import { UN_AUTH_ERR_MSG } from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async createComment(
    _: any,
    {
      data: { content, postId, parentComment },
    }: { data: { parentComment?: string; postId: string; content: string } },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    const result = await createCommentCtrl(
      prisma,
      postId,
      content,
      user,
      parentComment
    );
    return result;
  },
};
