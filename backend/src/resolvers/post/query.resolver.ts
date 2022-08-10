import { GraphQLYogaError } from "@graphql-yoga/node";
import {
  getAllPostsByTagCtrl,
  getAllPostsCtrl,
  getAllPostsOnOffsetCtrl,
  getTrendingPostsCtrl,
} from "../../controller/post.controller";
import { getPostById } from "../../services/post.service";
import { NOT_EXIST_ERR_MSG } from "../../utils/constants";
import {
  ICursorQueryParams,
  IOffsetQueryParams,
  IPostsByTagQueryParams,
} from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async postsOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getAllPostsOnOffsetCtrl(prisma, params);
    return result;
  },
  async posts(
    _: any,
    params: ICursorQueryParams,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getAllPostsCtrl(prisma, params);
    return result;
  },
  async post(
    _: any,
    { id }: { id: string },
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    try {
      const result = await getPostById(prisma, id);

      return result;
    } catch (error: any) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }
  },
  async trendingPosts(
    _: any,
    __: any,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getTrendingPostsCtrl(prisma);
    return result;
  },

  async tagPosts(
    _: any,
    params: IPostsByTagQueryParams,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getAllPostsByTagCtrl(prisma, params);
    return result;
  },
};
