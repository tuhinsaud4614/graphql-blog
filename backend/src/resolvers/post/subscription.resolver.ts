import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import {
  SUBSCRIPTION_REACTIONS,
  SUBSCRIPTION_REACTIONS_ERR_MSG,
  UN_AUTH_ERR_MSG,
} from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";
import { getGraphqlYogaError } from "../../validations";

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
          return new GraphQLYogaError(UN_AUTH_ERR_MSG);
        }
        return pubSub.subscribe(SUBSCRIPTION_REACTIONS(postId));
      } catch (error) {
        console.log(error);
        return getGraphqlYogaError(error, SUBSCRIPTION_REACTIONS_ERR_MSG);
      }
    },
  },
};
