import { PrismaClient } from "@prisma/client";

class DbClient {
  static #instance: PrismaClient;

  private constructor() {}

  public static get instance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new PrismaClient();
    return this.#instance;
  }
}

const prisma = DbClient.instance;

export default prisma;
