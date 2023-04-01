import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";

import logger from "@/logger";
import {
  SUBSCRIPTION_REACTIONS_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "@/utils/constants";
import { YogaContextReturnType } from "@/utils/types";
import { getGraphqlYogaError } from "@/validations";

export const Subscription = {
  reactions: {
    async subscribe(
      _: any,
      { postId }: { postId: string },
      { user, pubSub }: YogaContextReturnType,
      ___: GraphQLResolveInfo
    ) {
      try {
        if (user === null) {
          return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
            code: UN_AUTH_EXT_ERR_CODE,
          });
        }
        // return pubSub.subscribe(SUBSCRIPTION_REACTIONS(postId));
        return pubSub.subscribe("reactions", postId);
      } catch (error) {
        logger.error(error);
        return getGraphqlYogaError(error, SUBSCRIPTION_REACTIONS_ERR_MSG);
      }
    },
    resolve: (payload: any) => payload,
  },
};
