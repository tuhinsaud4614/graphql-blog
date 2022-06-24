import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { ITag } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Tag = {
  async posts(
    { id }: ITag,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const posts = await prisma.tag
        .findUnique({
          where: { id: id },
        })
        .posts();

      return posts;
    } catch (error) {
      console.log(error);

      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
};
