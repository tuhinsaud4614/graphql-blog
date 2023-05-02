import { GraphQLResolveInfo } from "graphql";

import { uploadImageCtrl } from "@/controller/common.controller";
import { AuthenticationError, ForbiddenError } from "@/model";
import { uploadFileService } from "@/services";
import { VERIFIED_AUTHOR_ERR_MSG } from "@/utils/constants";
import { FileParams, YogaContext } from "@/utils/types";

export const Mutation = {
  async uploadFile(
    _: unknown,
    params: FileParams,
    { user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await uploadFileService(params);
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

    return await uploadImageCtrl(image);
  },
};
