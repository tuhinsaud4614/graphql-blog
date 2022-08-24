import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import { uploadFileCtrl } from "../../controller/common.controller";
import {
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
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
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
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
