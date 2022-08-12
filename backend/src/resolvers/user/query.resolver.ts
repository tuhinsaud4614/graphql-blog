import { GraphQLYogaError } from "@graphql-yoga/node";
import { getUsersOnOffsetCtrl } from "../../controller/user.controller";
import { getUserById } from "../../services/user.service";
import { NOT_EXIST_ERR_MSG } from "../../utils/constants";
import { IOffsetQueryParams } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";
import { getGraphqlYogaError } from "../../validations";

export const Query = {
  async users(_: unknown, __: unknown, { prisma }: YogaContextReturnType) {
    const u = await prisma.user.findMany();
    return u;
  },

  async usersOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma }: YogaContextReturnType
  ) {
    const result = await getUsersOnOffsetCtrl(prisma, params);
    return result;
  },

  async user(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContextReturnType
  ) {
    try {
      const user = await getUserById(prisma, id);
      if (user === null) {
        return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
      }
      return user;
    } catch (error) {
      return getGraphqlYogaError(error, NOT_EXIST_ERR_MSG("User"));
    }
  },
};
