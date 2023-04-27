import { GraphQLError, GraphQLResolveInfo } from "graphql";

import {
  uploadFileCtrl,
  uploadImageCtrl,
} from "@/controller/common.controller";
import { AuthenticationError } from "@/model";
import {
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  VERIFIED_AUTHOR_ERR_MSG,
} from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const Mutation = {
  async uploadFile(
    _: any,
    { file }: { file: File },
    { user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new GraphQLError(VERIFIED_AUTHOR_ERR_MSG);
    }

    const result = await uploadFileCtrl(file);
    return result;
  },
  async uploadImage(
    _: unknown,
    { image }: { image: File },
    { user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    const result = await uploadImageCtrl(image);
    return result;
  },
};
