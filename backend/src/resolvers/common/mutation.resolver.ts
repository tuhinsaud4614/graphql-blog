import { GraphQLResolveInfo } from "graphql";

import { AuthenticationError, ForbiddenError } from "@/model";
import { uploadFileService, uploadImageService } from "@/services";
import { VERIFIED_AUTHOR_ERR_MSG } from "@/utils/constants";
import type { FileParams, ImageParams, YogaContext } from "@/utils/types";

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
    params: ImageParams,
    { user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await uploadImageService(params);
  },
};
