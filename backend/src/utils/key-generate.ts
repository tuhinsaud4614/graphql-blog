class KeyGenerate {
  // Define a readonly static property for the JWT cookie key
  static readonly JWT_COOKIE_KEY: string = "jwt";

  /**
   * Generates a redis key for storing a refresh token associated with a user's id.
   *
   * @param {string} id - The id of the user.
   * @return {string} The redis key.
   */
  static refreshTokenKey(id: string): string {
    // The redis key for storing a refresh token is in the format "REFRESH_TOKEN@<id>".
    // This is a constant string prefix, followed by the user's id.
    // The "as const" assertion is used to ensure that the return type of the function is a string literal type.
    return `REFRESH_TOKEN@${id}` as const;
  }
}

export default KeyGenerate;
