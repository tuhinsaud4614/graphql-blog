/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloCache } from "@apollo/client";
import { produce } from "immer";

import {
  FCategoryFragment,
  FTagFragment,
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  GetCategoryCountDocument,
  GetCategoryCountQuery,
  GetTagCountDocument,
  GetTagCountQuery,
  GetTagsWithOffsetDocument,
  GetTagsWithOffsetQuery,
  GetTagsWithOffsetQueryVariables,
} from "@/graphql/generated/schema";

import { isDev } from "./isType";

/**
 * The function updates the category count in the Apollo cache.
 * @param cache - The `cache` parameter is an instance of the ApolloCache class. It is used to read and
 * write data to the Apollo Client cache.
 * @param {number} value - The `value` parameter is the number of categories that you want to update in
 * the cache.
 */
export function updateGetCategoriesCount<T>(
  cache: ApolloCache<T>,
  value: number,
) {
  cache.writeQuery<GetCategoryCountQuery>({
    query: GetCategoryCountDocument,
    data: {
      categoryCount: value,
    },
  });
}

/**
 * The function modifies the `GetCategoriesWithOffsetQuery` in the Apollo cache by adding or updating a
 * category.
 * @param cache - The `cache` parameter is an instance of the ApolloCache class, which is used to store
 * and manage the client-side cache for Apollo Client.
 * @param {FCategoryFragment} category - The `category` parameter is of type `FCategoryFragment` and
 * represents a category object that will be added or updated in the list of categories.
 * @param {"UPDATE" | "ADD"} mode - The `mode` parameter is used to determine how the categories should
 * be modified in the cache. It can have two possible values:
 */
export function modifyGetCategoriesWithOffsetQuery<T>({
  cache,
  category,
  mode,
  variables,
}: {
  cache: ApolloCache<T>;
  category: FCategoryFragment;
  mode: "UPDATE" | "ADD";
  variables?: GetCategoriesWithOffsetQueryVariables;
}) {
  try {
    cache.updateQuery<
      GetCategoriesWithOffsetQuery,
      GetCategoriesWithOffsetQueryVariables
    >(
      {
        query: GetCategoriesWithOffsetDocument,
        variables,
      },
      (prevCategories) => {
        if (
          !prevCategories ||
          prevCategories.categoriesWithOffset.total === 0
        ) {
          if (mode === "ADD") {
            updateGetCategoriesCount(cache, 1);
            return {
              categoriesWithOffset: {
                data: [category],
                total: 1,
              },
            };
          }

          return null;
        }

        const newCategories = produce(prevCategories, (draft) => {
          if (mode === "UPDATE") {
            draft.categoriesWithOffset.data =
              draft.categoriesWithOffset.data.map((cat) =>
                cat.id === category.id ? category : cat,
              );
          } else {
            draft.categoriesWithOffset.data = [
              category,
              ...draft.categoriesWithOffset.data,
            ];
            draft.categoriesWithOffset.total += 1;
            updateGetCategoriesCount(cache, draft.categoriesWithOffset.total);
          }
        });
        return newCategories;
      },
    );
  } catch (error) {
    isDev() &&
      console.error("ModifyGetCategoriesWithOffsetQuery@Errors: ", error);
  }
}

/**
 * The function deletes a category from a list of categories in the cache and updates the total count
 * of categories.
 * @param cache - The `cache` parameter is an instance of the ApolloCache class. It is used to access
 * and modify the Apollo Client cache.
 * @param id - The `id` parameter is the unique identifier of the category that needs to be deleted.
 */
export function deleteGetCategoriesWithOffsetQuery<T>(
  cache: ApolloCache<T>,
  id: FCategoryFragment["id"],
  variables?: GetCategoriesWithOffsetQueryVariables,
) {
  try {
    cache.updateQuery<
      GetCategoriesWithOffsetQuery,
      GetCategoriesWithOffsetQueryVariables
    >(
      {
        query: GetCategoriesWithOffsetDocument,
        variables,
      },
      (prevCategories) => {
        if (!prevCategories) {
          return null;
        }
        const updatedCategories = produce(prevCategories, (draft) => {
          if (draft.categoriesWithOffset.total > 0) {
            draft.categoriesWithOffset.data =
              draft.categoriesWithOffset.data.filter((cat) => cat.id !== id);
            draft.categoriesWithOffset.total -= 1;
            updateGetCategoriesCount(cache, draft.categoriesWithOffset.total);
          }
        });
        return updatedCategories;
      },
    );
  } catch (error) {
    isDev() && console.log(error);
  }
}

/**
 * The function updates the tag count in the Apollo cache.
 * @param cache - The `cache` parameter is an instance of the ApolloCache class. It is used to read and
 * write data to the Apollo Client cache.
 * @param {number} value - The `value` parameter is the number that you want to update the `tagCount`
 * with in the cache.
 */
export function updateGetTagCount<T>(cache: ApolloCache<T>, value: number) {
  cache.writeQuery<GetTagCountQuery>({
    query: GetTagCountDocument,
    data: {
      tagCount: value,
    },
  });
}

/**
 * The function modifies a query in an Apollo cache by updating or adding a tag based on the specified
 * mode.
 * @param  - - `cache`: The Apollo cache object used for updating the query result.
 */
export function modifyGetTagWithOffsetQuery<T>({
  cache,
  tag,
  mode,
  variables,
}: {
  cache: ApolloCache<T>;
  tag: FTagFragment;
  mode: "UPDATE" | "ADD";
  variables?: GetTagsWithOffsetQueryVariables;
}) {
  try {
    cache.updateQuery<GetTagsWithOffsetQuery, GetTagsWithOffsetQueryVariables>(
      {
        query: GetTagsWithOffsetDocument,
        variables,
      },
      (prevTags) => {
        if (!prevTags || prevTags.tagsWithOffset.total === 0) {
          if (mode === "ADD") {
            updateGetTagCount(cache, 1);
            return {
              tagsWithOffset: {
                results: [tag],
                total: 1,
              },
            };
          }

          return null;
        }

        const modifiedTags = produce(prevTags, (draft) => {
          if (mode === "UPDATE") {
            draft.tagsWithOffset.results = draft.tagsWithOffset.results.map(
              (oldTag) => (oldTag.id === tag.id ? tag : oldTag),
            );
          } else {
            draft.tagsWithOffset.results = [
              tag,
              ...draft.tagsWithOffset.results,
            ];
            draft.tagsWithOffset.total += 1;
            updateGetTagCount(cache, draft.tagsWithOffset.total);
          }
        });
        return modifiedTags;
      },
    );
  } catch (error) {
    isDev() && console.error("ModifyGetTagWithOffsetQuery@Errors: ", error);
  }
}

/**
 * The function deletes a specific tag from a list of tags and updates the total count of tags.
 * @param cache - The `cache` parameter is an instance of the ApolloCache class, which is used to store
 * and manage the client-side cache for Apollo Client.
 * @param id - The `id` parameter is the unique identifier of the tag that needs to be deleted from the
 * cache.
 */
export function deleteGetTagsWithOffsetQuery<T>(
  cache: ApolloCache<T>,
  id: FTagFragment["id"],
  variables?: GetTagsWithOffsetQueryVariables,
) {
  try {
    cache.updateQuery<GetTagsWithOffsetQuery, GetTagsWithOffsetQueryVariables>(
      {
        query: GetTagsWithOffsetDocument,
        variables,
      },
      (prevTags) => {
        if (!prevTags) {
          return null;
        }
        const updatedTags = produce(prevTags, (draft) => {
          if (draft.tagsWithOffset.total > 0) {
            draft.tagsWithOffset.results = draft.tagsWithOffset.results.filter(
              (cat) => cat.id !== id,
            );
            draft.tagsWithOffset.total -= 1;
            updateGetTagCount(cache, draft.tagsWithOffset.total);
          }
        });
        return updatedTags;
      },
    );
  } catch (error) {
    isDev() && console.error("DeleteGetTagWithOffsetQuery@Errors: ", error);
  }
}
