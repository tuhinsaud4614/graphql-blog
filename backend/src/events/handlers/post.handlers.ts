import logger from "@/logger";
import { getPostByIdWithAllInformation } from "@/repositories/post";
import PostIndexer from "@/repositories/postIndexer.es";
import { PUBSUB_EVENTS } from "@/utils/constants";
import prisma from "@/utils/db-client";
import { esClient } from "@/utils/es-client";
import { transferPostToPostCache } from "@/utils/object-transfer";

import { EventEmitter } from "../emitter";

const postIndexer = new PostIndexer(esClient.client);
export async function setupPostHandlers(emitter: EventEmitter) {
  const unsubscribeCallbacks: (() => Promise<void>)[] = [];

  // Post Creation Handler
  const unSubPostPublish = await emitter.on(
    PUBSUB_EVENTS.POST_PUBLISH,
    async (post) => {
      try {
        const publishedPost = await getPostByIdWithAllInformation(
          prisma,
          post.postID,
        );
        if (!publishedPost) {
          logger.error(
            `Post indexing failed for ${post.postID}: Post not found`,
          );
          return;
        }
        await postIndexer.upsertPostESPost(
          transferPostToPostCache(publishedPost),
        );
        logger.info(`Upsert post ${post.postID}`);
      } catch (err) {
        logger.error(`Post indexing failed for ${post.postID}:`, err);
      }
    },
  );
  unsubscribeCallbacks.push(unSubPostPublish);

  // Return cleanup function
  return async () => {
    await Promise.all(unsubscribeCallbacks.map((fn) => fn()));
  };
}
