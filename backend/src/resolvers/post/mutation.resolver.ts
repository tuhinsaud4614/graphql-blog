import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import {
  createPostCtrl,
  deletePostCtrl,
  reactionToCtrl,
  updatePostCtrl,
} from "../../controller/post.controller";
import {
  ROLE_ERR_MSG,
  UN_AUTH_ERR_MSG,
  VERIFIED_AUTHOR_ERR_MSG,
} from "../../utils/constants";
import { EAuthorStatus, EUserRole } from "../../utils/enums";
import { ICreatePostInput, IUpdatePostInput } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async createPost(
    _: any,
    { data }: { data: ICreatePostInput },
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

  async updatePost(
    _: any,
    { data }: { data: IUpdatePostInput },
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

    const result = await updatePostCtrl(prisma, data, user);
    return result;
  },

  async deletePost(
    _: any,
    { id }: { id: string },
    { prisma, user }: YogaContextReturnType,
    ___: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    if (user.role === EUserRole.User) {
      return new GraphQLYogaError(ROLE_ERR_MSG("admin", "author"));
    }

    const result = await deletePostCtrl(prisma, id, user);
    return result;
  },

  async reactionToPost(
    _: any,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContextReturnType,
    ___: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }
    const result = await reactionToCtrl(prisma, pubSub, toId, user);
    return result;
  },
};
