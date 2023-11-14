/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloCache } from "@apollo/client";
import { produce } from "immer";

import {
  FCategoryFragment,
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  GetCategoryCountDocument,
  GetCategoryCountQuery,
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
}: {
  cache: ApolloCache<T>;
  category: FCategoryFragment;
  mode: "UPDATE" | "ADD";
}) {
  try {
    cache.updateQuery<
      GetCategoriesWithOffsetQuery,
      GetCategoriesWithOffsetQueryVariables
    >(
      {
        query: GetCategoriesWithOffsetDocument,
        variables: { limit: 10, page: 1 },
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
          draft.categoriesWithOffset.data = [
            category,
            ...draft.categoriesWithOffset.data,
          ];
          if (mode === "ADD") {
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
) {
  try {
    cache.updateQuery<
      GetCategoriesWithOffsetQuery,
      GetCategoriesWithOffsetQueryVariables
    >(
      {
        query: GetCategoriesWithOffsetDocument,
        variables: { limit: 10, page: 1 },
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
