import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import { createPostCtrl } from "../../controller/post.controller";
import {
  ROLE_ERR_MSG,
  UN_AUTH_ERR_MSG,
  VERIFIED_AUTHOR_ERR_MSG,
} from "../../utils/constants";
import { EAuthorStatus, EUserRole } from "../../utils/enums";
import { IPostInput } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async createPost(
    _: any,
    { data }: { data: IPostInput },
    { prisma, user }: YogaContextReturnType,
    ___: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    if (user.role === EUserRole.User) {
      return new GraphQLYogaError(ROLE_ERR_MSG("admin", "author"));
    }

    if (
      user.role === EUserRole.Author &&
      user.authorStatus !== EAuthorStatus.Verified
    ) {
      return new GraphQLYogaError(VERIFIED_AUTHOR_ERR_MSG);
    }

    const result = await createPostCtrl(prisma, data, user);
    return result;
  },
};
