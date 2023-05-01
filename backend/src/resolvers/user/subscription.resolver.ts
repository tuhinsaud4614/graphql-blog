import { GraphQLResolveInfo } from "graphql";

import logger from "@/logger";
import { AuthenticationError, UnknownError } from "@/model";
import { verifyAccessTokenFromExtensions } from "@/utils";
import {
  SUBSCRIPTION_FOLLOWING_ERR_MSG,
  SUBSCRIPTION_USER_VERIFICATION_ERR_MSG,
  UN_AUTH_ERR_MSG,
} from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const Subscription = {
  following: {
    async subscribe(
      _: unknown,
      __: unknown,
      { pubSub, params: { extensions } }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        const user = verifyAccessTokenFromExtensions(extensions);

        if (user === null) {
          return new AuthenticationError(UN_AUTH_ERR_MSG);
        }

        return pubSub.subscribe("following", user.id);
      } catch (error) {
        logger.error(error);
        return new UnknownError(SUBSCRIPTION_FOLLOWING_ERR_MSG);
      }
    },
    resolve: (payload: unknown) => payload,
  },
  userVerify: {
    async subscribe(
      _: unknown,
      { userId }: { userId: string },
      { pubSub }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        // return pubSub.subscribe(SUBSCRIPTION_USER_VERIFICATION(userId));
        return pubSub.subscribe("verifyUser", userId);
      } catch (error) {
        logger.error(error);
        return new UnknownError(SUBSCRIPTION_USER_VERIFICATION_ERR_MSG);
      }
    },
    resolve: (payload: unknown) => payload,
  },
};
