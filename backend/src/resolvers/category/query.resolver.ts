import { GraphQLYogaError } from "@graphql-yoga/node";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async categories(
    _: any,
    __: any,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    try {
      const result = await prisma.category.findMany();
      // console.log(JSON.stringify(result, null, 2));

      return result;
    } catch (error: any) {
      console.log(error);

      return new GraphQLYogaError(error);
    }
  },
};
