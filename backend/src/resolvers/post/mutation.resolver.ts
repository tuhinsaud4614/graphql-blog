import { GraphQLResolveInfo } from "graphql";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async createPost(
    _: any,
    args: unknown,
    ___: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    console.log(args);

    // if (user === null) {
    //   return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    // }

    // if (user.role === EUserRole.User) {
    //   return new GraphQLYogaError(ROLE_ERR_MSG("admin", "author"));
    // }

    // if (
    //   user.role === EUserRole.Author &&
    //   user.authorStatus !== EAuthorStatus.Verified
    // ) {
    //   return new GraphQLYogaError(VERIFIED_AUTHOR_ERR_MSG);
    // }

    // const result = await createPostCtrl(prisma, data, user);
    // return result;
    return "hh";
  },
};
