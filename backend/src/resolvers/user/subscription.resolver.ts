import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import logger from "../../logger";
import {
  SUBSCRIPTION_FOLLOWING_ERR_MSG,
  SUBSCRIPTION_USER_VERIFICATION_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";
import { getGraphqlYogaError } from "../../validations";

export const Subscription = {
  following: {
    async subscribe(
      _: any,
      __: any,
      { pubSub, user }: YogaContextReturnType,
      ___: GraphQLResolveInfo
    ) {
      try {
        if (user === null) {
          return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
            code: UN_AUTH_EXT_ERR_CODE,
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
      { pubSub }: YogaContextReturnType,
      ___: GraphQLResolveInfo
    ) {
      try {
        // return pubSub.subscribe(SUBSCRIPTION_USER_VERIFICATION(userId));
        return pubSub.subscribe("verifyUser", userId);
      } catch (error) {
        logger.error(error);
        return getGraphqlYogaError(
          error,
          SUBSCRIPTION_USER_VERIFICATION_ERR_MSG
        );
      }
    },
    resolve: (payload: any) => payload,
  },
};
