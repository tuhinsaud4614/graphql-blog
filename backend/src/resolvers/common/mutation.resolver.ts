import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import { uploadFileCtrl } from "../../controller/common.controller";
import {
  ROLE_ERR_MSG,
  UN_AUTH_ERR_MSG,
  VERIFIED_AUTHOR_ERR_MSG,
} from "../../utils/constants";
import { EAuthorStatus, EUserRole } from "../../utils/enums";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async uploadFile(
    _: any,
    { file }: { file: File },
    { user }: YogaContextReturnType,
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

    const result = await uploadFileCtrl(file);
    return result;
  },
};
