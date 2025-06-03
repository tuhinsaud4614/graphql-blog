import { Picture, PrismaClient } from "@prisma/client";

/**
 * Creates an image in the database.
 * @param {PrismaClient} prisma - The Prisma client instance.
 * @param {{ imgUrl: string; width?: number; height?: number }} data - The data to create an image in the database.
 * @returns {Promise<Picture>} - The created image.
 */
export async function createImageInDb(
  prisma: PrismaClient,
  data: { imgUrl: string; width?: number; height?: number },
): Promise<Picture> {
  // Create a new image in the database with the provided data.
  // The `url` property is required and the `width` and `height` properties are optional.
  return prisma.picture.create({
    data: {
      url: data.imgUrl,
      width: data.width,
      height: data.height,
    },
  });
}
