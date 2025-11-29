import { Client } from "@elastic/elasticsearch";

import { PostCache } from "@/dto/post.dto";
import logger from "@/logger";

export default class PostIndexer {
  private esClient: Client;
  private indexInitialized: boolean = false;
  private config: Parameters<Client["indices"]["create"]>["0"];

  constructor(esClient: Client) {
    this.esClient = esClient;
    // Set default configuration
    this.config = {
      index: "posts",
      mappings: {
        properties: {
          id: { type: "keyword" },
          author: {
            properties: {
              authorId: { type: "keyword" },
              firstName: { type: "keyword" },
              lastName: { type: "keyword" },
              fullName: { type: "text" },
            },
          },
          title: { type: "text" },
          content: { type: "text" },
          tags: {
            type: "nested",
            properties: {
              id: { type: "keyword" },
              name: { type: "keyword" },
            },
          },
          categories: {
            type: "nested",
            properties: {
              id: { type: "keyword" },
              name: { type: "keyword" },
            },
          },
        },
      },
    };
  }

  /**
   * Initialize the Elasticsearch index if it doesn't exist
   */
  private async initializeIndex(): Promise<void> {
    if (this.indexInitialized) return;

    try {
      const exists = await this.esClient.indices.exists({
        index: this.config.index,
      });

      if (!exists) {
        logger.info(`Creating Elasticsearch index: ${this.config.index}`);

        await this.esClient.indices.create({
          ...this.config,
        });

        logger.info(`Successfully created index: ${this.config.index}`);
      }

      this.indexInitialized = true;
    } catch (error) {
      logger.error(`Failed to initialize Elasticsearch index: ${error}`);
      throw error;
    }
  }

  /**
   * Upserts a post document into the Elasticsearch "posts" index. If the document
   * with the specified ID does not exist, it will be created. If it does exist,
   * it will be updated with the new data provided.
   *
   * @param post - The post data to be upserted into Elasticsearch.
   * @returns A promise resolving to the result of the Elasticsearch update operation.
   */
  public async upsertPostESPost(post: PostCache) {
    await this.initializeIndex();
    return this.esClient.update({
      index: "posts",
      id: post.id.toString(),
      doc: post,
      doc_as_upsert: true, // ensures it will insert if it doesn't exist
    });
  }
}
