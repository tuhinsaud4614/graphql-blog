import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import { Post, UserStatus } from "@prisma/client";
import { SuperJSON } from "superjson";

import { createPubSub } from "graphql-yoga";

import { PUBSUB_EVENTS } from "./constants";
import { EFollowingMutationStatus, EReactionsMutationStatus } from "./enums";
import redisClient from "./redis";
import { UserWithAvatar } from "./types";

const yogaPubSub = createPubSub<{
  [PUBSUB_EVENTS.FOLLOWING]: [
    userId: string,
    payload: { followedBy: UserWithAvatar; mutation: EFollowingMutationStatus },
  ];
  [PUBSUB_EVENTS.VERIFY_USER]: [
    userId: string,
    payload: { userId: string; mutation: UserStatus },
  ];
  [PUBSUB_EVENTS.REACTIONS]: [
    postId: string,
    payload: { reactBy: UserWithAvatar; mutation: EReactionsMutationStatus },
  ];
  [PUBSUB_EVENTS.POST_PUBLISH]: [postId: Post["id"]];
}>({
  eventTarget: createRedisEventTarget({
    publishClient: redisClient.publisherClient,
    subscribeClient: redisClient.subscriberClient,
    serializer: SuperJSON,
  }),
});

export default yogaPubSub;
