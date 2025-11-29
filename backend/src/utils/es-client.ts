import { Client } from "@elastic/elasticsearch";

import config from "./config";
import { isDev } from "./type-guard";

export class ElasticsearchClient {
  private _client: Client;
  private static instance: ElasticsearchClient;

  private constructor() {
    this._client = new Client({
      node: `https://${config.ES_HOST}:${config.ES_PORT}`,
      auth: {
        username: config.ELASTIC_USERNAME,
        password: config.ELASTIC_PASSWORD,
      },
      tls: { rejectUnauthorized: !isDev() },
    });
  }

  public static getInstance(): ElasticsearchClient {
    if (!ElasticsearchClient.instance) {
      ElasticsearchClient.instance = new ElasticsearchClient();
    }
    return ElasticsearchClient.instance;
  }

  public get client(): Client {
    return this._client;
  }

  // public async indexPost(post: any): Promise<void> {
  //   try {
  //     await this.client.index({
  //       index: "posts",
  //       id: post.id,
  //       body: {
  //         title: post.title,
  //         content: post.content,
  //         authorId: post.authorId,
  //         createdAt: post.createdAt,
  //         updatedAt: post.updatedAt,
  //       },
  //     });
  //     console.log(`Post indexed in Elasticsearch: ${post.id}`);
  //   } catch (err) {
  //     console.error("Error indexing post:", err);
  //     throw err;
  //   }
  // }

  // public async searchPosts<>(query: string): Promise<any[]> {
  //   try {
  //     const { body } = await this.client.search({
  //       index: "posts",
  //       body: {
  //         query: {
  //           multi_match: {
  //             query,
  //             fields: ["title^3", "content"],
  //           },
  //         },
  //       },
  //     });

  //     return body.hits.hits.map((hit: any) => hit._source);
  //   } catch (err) {
  //     console.error("Error searching posts:", err);
  //     throw err;
  //   }
  // }
}

export const esClient = ElasticsearchClient.getInstance();
