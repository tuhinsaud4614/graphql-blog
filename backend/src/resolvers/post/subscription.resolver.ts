import { GraphQLError, GraphQLResolveInfo } from "graphql";

import logger from "@/logger";
import {
  SUBSCRIPTION_REACTIONS_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "@/utils/constants";
import { YogaContext } from "@/utils/types";
import { getGraphqlYogaError } from "@/validations";

export const Subscription = {
  reactions: {
    async subscribe(
      _: any,
      { postId }: { postId: string },
      { user, pubSub }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        if (user === null) {
          return new GraphQLError(UN_AUTH_ERR_MSG, {
            extensions: {
              code: UN_AUTH_EXT_ERR_CODE,
            },
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
