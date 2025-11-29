import { GraphQLResolveInfo } from "graphql";

import logger from "@/logger";
import { AuthenticationError, UnknownError } from "@/model";
import {
  PUBSUB_EVENTS,
  SUBSCRIPTION_REACTIONS_ERR_MSG,
} from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const Subscription = {
  reactions: {
    async subscribe(
      _: unknown,
      { postId }: { postId: string },
      { user, pubSub }: YogaContext,
      ___: GraphQLResolveInfo,
    ) {
      try {
        if (user === null) {
          return new AuthenticationError();
        }
        return pubSub.subscribe(PUBSUB_EVENTS.REACTIONS, postId);
      } catch (error) {
        logger.error(error);
        return new UnknownError(SUBSCRIPTION_REACTIONS_ERR_MSG);
      }
    },
    resolve: (payload: unknown) => payload,
  },
};
