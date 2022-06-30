import { GraphQLYogaError } from "@graphql-yoga/node";
import { getPostById } from "../../services/post.service";
import { NOT_EXIST_ERR_MSG } from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async posts(
    _: any,

    { limit, page }: { limit?: number; page?: number },
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    try {
      // limit && page all have value return paginate value
      const count = await prisma.post.count();
      if (limit && page) {
        const result = await prisma.post.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { updatedAt: "desc" },
        });

        return {
          data: result,
          total: count,
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        };
      }

      const result = await prisma.post.findMany();
      return {
        data: result,
        total: count,
        hasNext: false,
        nextPage: 1,
        previousPage: 1,
        totalPages: 1,
      };
    } catch (error: any) {
      console.log(error);

      return new GraphQLYogaError(error);
    }
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
