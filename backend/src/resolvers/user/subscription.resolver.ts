import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import {
  SUBSCRIPTION_FOLLOWING,
  SUBSCRIPTION_FOLLOWING_ERR_MSG,
  UN_AUTH_ERR_MSG,
} from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";
import { getGraphqlYogaError } from "../../validations";

export const Subscription = {
  following: {
    async subscribe(
      _: any,
      __: any,
      { user, pubSub }: YogaContextReturnType,
      ___: GraphQLResolveInfo
    ) {
      try {
        if (user === null) {
          return new GraphQLYogaError(UN_AUTH_ERR_MSG);
        }
        return pubSub.subscribe(SUBSCRIPTION_FOLLOWING(user.id));
      } catch (error) {
        console.log(error);
        return getGraphqlYogaError(error, SUBSCRIPTION_FOLLOWING_ERR_MSG);
      }
    },
  },
};
