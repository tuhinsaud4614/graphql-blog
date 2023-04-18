import { GraphQLError, GraphQLResolveInfo } from "graphql";

import logger from "@/logger";
import { verifyAccessTokenFromExtensions } from "@/utils";
import {
  SUBSCRIPTION_FOLLOWING_ERR_MSG,
  SUBSCRIPTION_USER_VERIFICATION_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "@/utils/constants";
import { YogaContext } from "@/utils/types";
import { getGraphqlYogaError } from "@/validations";

export const Subscription = {
  following: {
    async subscribe(
      _: any,
      __: any,
      { pubSub, extensions }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        const user = verifyAccessTokenFromExtensions(extensions);

        if (user === null) {
          return new GraphQLError(UN_AUTH_ERR_MSG, {
            extensions: {
              code: UN_AUTH_EXT_ERR_CODE,
            },
          });
        }
        return pubSub.subscribe("following", user.id);
      } catch (error) {
        logger.error(error);
        return getGraphqlYogaError(error, SUBSCRIPTION_FOLLOWING_ERR_MSG);
      }
    },
    resolve: (payload: any) => payload,
  },
  userVerify: {
    async subscribe(
      _: any,
      { userId }: { userId: string },
      { pubSub }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        // return pubSub.subscribe(SUBSCRIPTION_USER_VERIFICATION(userId));
        return pubSub.subscribe("verifyUser", userId);
      } catch (error) {
        logger.error(error);
        return getGraphqlYogaError(
          error,
          SUBSCRIPTION_USER_VERIFICATION_ERR_MSG,
        );
      }
    },
    resolve: (payload: any) => payload,
  },
};
