import { GraphQLYogaError } from "@graphql-yoga/node";
import { Prisma } from "@prisma/client";
import { getAllPostsCtrl } from "../../controller/post.controller";
import { getPostById } from "../../services/post.service";
import { NOT_EXIST_ERR_MSG } from "../../utils/constants";
import { EUserRole } from "../../utils/enums";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async posts(
    _: any,
    params: { role: string; limit?: number; page?: number },
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const args: Prisma.PostFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: params.role === EUserRole.User ? { published: true } : undefined,
    };
    const result = await getAllPostsCtrl(prisma, params, args);
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
};
