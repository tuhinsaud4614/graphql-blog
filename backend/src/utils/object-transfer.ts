import { PostCache } from "@/dto/post.dto";
import { getPostByIdWithAllInformation } from "@/repositories/post";

import { extractFNAndLNFromFullName, extractText } from ".";
import { UserWithAvatar } from "./types";

/**
 * Converts a Post object, including its author, categories, and tags, into a PostCache object.
 *
 * @param post - The Post object to convert, which includes the author details,
 *               categories, and tags. The author is an object that includes the user's
 *               avatar, categories are an array of Category objects, and tags are an array
 *               of Tag objects.
 *
 * @returns A PostCache object containing the post's id, title, content (if available),
 *          author details including authorId, fullName, firstName, and lastName,
 *          and arrays of categories and tags with their ids and names.
 */
export function transferPostToPostCache(
  post: NonNullable<Awaited<ReturnType<typeof getPostByIdWithAllInformation>>>,
): PostCache {
  const [fn, ln] = post.author.name
    ? extractFNAndLNFromFullName(post.author.name)
    : ["", ""];
  return {
    id: post?.id,
    title: post.title,
    content: post.content ? extractText(post.content) : undefined,
    author: {
      authorId: post.authorId,
      fullName: post.author.name || "",
      firstName: fn,
      lastName: ln,
    },
    categories: post.categories.map((c) => ({ id: c.id, name: c.title })),
    tags: post.tags.map((t) => ({ id: t.id, name: t.title })),
  };
}

export function publicUserInfo(user: UserWithAvatar) {
  return user;
}
