import logger from "@/logger";
import KeyGenerate from "@/utils/key-generate";
import redisClient from "@/utils/redis";

/**
 * Save a refresh token to Redis cache.
 *
 * @param {string} userId - User ID.
 * @param {string} refreshToken - Refresh token.
 * @param {string|number} refreshTokenExp - Refresh token expiration time in milliseconds.
 * @throws {Error} If unable to save the refresh token.
 */
export async function addUserTokenOnCache(
  userId: string,
  refreshToken: string,
  refreshTokenExp: string | number,
) {
  const cacheKey = KeyGenerate.refreshTokenKey(userId);
  try {
    await redisClient.generalClient
      .multi()
      .sadd(cacheKey, refreshToken)
      .expire(cacheKey, Math.floor(+refreshTokenExp))
      .exec();
  } catch (error) {
    logger.error(error);
    throw new Error("Unable to save your session. Please try again later.");
  }
}

/**
 * Check if the given refresh token is valid for the given user in Redis cache.
 *
 * @param {string} userId - User ID.
 * @param {string} refreshToken - Refresh token.
 * @returns {Promise<boolean>} If the refresh token is valid.
 * @throws {Error} If unable to verify the refresh token.
 */
export async function checkUserTokenOnCache(
  userId: string,
  refreshToken: string,
) {
  const cacheKey = KeyGenerate.refreshTokenKey(userId);
  try {
    // Retrieve the value from Redis
    const exists = await redisClient.generalClient.sismember(
      cacheKey,
      refreshToken,
    );

    return exists === 1;
  } catch (error) {
    logger.error(error);
    throw new Error("Unable to verify your session. Please try again later.");
  }
}

/**
 * Remove a refresh token from Redis cache.
 *
 * @param {string} userId - User ID.
 * @param {string} refreshToken - Refresh token.
 * @throws {Error} If unable to remove the refresh token.
 */
export async function removeUserTokenOnCache(
  userId: string,
  refreshToken: string,
) {
  const cacheKey = KeyGenerate.refreshTokenKey(userId);
  try {
    await redisClient.generalClient.srem(cacheKey, refreshToken);
  } catch (error) {
    logger.error(error);
    throw new Error(
      "Unable to remove your session token. Please try again later.",
    );
  }
}
