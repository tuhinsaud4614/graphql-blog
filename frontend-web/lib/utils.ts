import { ApolloError } from "@apollo/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { User } from "@/graphql/generated/schema";

import { IAnchorOrigin, IUser } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ARROW_SIZE = 14;
export const getPositions = (
  anchorRect: DOMRect | null,
  selfRect: DOMRect | null,
  anchorOrigin: IAnchorOrigin,
  fraction?: boolean | number,
  hideArrow?: boolean,
) => {
  let selfLeft = 0;
  let selfTop = 0;
  let arrowLeft = 0;
  let arrowTop = 0;
  let FRACTION = 1;

  let vertical: IAnchorOrigin["vertical"] = anchorOrigin.vertical;

  if (anchorRect) {
    const selfWidth = selfRect ? selfRect.width : 0;
    const selfHeight = selfRect ? selfRect.height : 0;
    arrowLeft = anchorRect.left + (anchorRect.width - ARROW_SIZE) / 2;

    // Horizontal start
    const hasLeftSpace = selfWidth < anchorRect.left;
    const hasRightSpace = window.innerWidth > anchorRect.right + selfWidth;

    let horizontal: IAnchorOrigin["horizontal"] = anchorOrigin.horizontal;

    if (anchorOrigin.horizontal === "left" && !hasRightSpace && hasLeftSpace) {
      horizontal = "right";
    } else if (
      anchorOrigin.horizontal === "right" &&
      !hasLeftSpace &&
      hasRightSpace
    ) {
      horizontal = "left";
    }

    if (horizontal === "right" && fraction) {
      FRACTION = typeof fraction === "boolean" ? 0.89 : fraction;
    } else if (horizontal === "left" && fraction) {
      FRACTION = typeof fraction === "boolean" ? 0.11 : fraction;
    } else if (horizontal === "left" && !fraction) {
      FRACTION = 0;
    }

    if (horizontal === "left") {
      selfLeft = anchorRect.left - selfWidth * FRACTION;
    } else if (horizontal === "right") {
      selfLeft = anchorRect.right - selfWidth * FRACTION;
    } else if (horizontal === "center") {
      selfLeft = anchorRect.left - (selfWidth - anchorRect.width) / 2;
    }
    // Horizontal End

    // Vertical Start
    const hasTopSpace =
      selfHeight + (hideArrow ? 4 : ARROW_SIZE) < anchorRect.top;

    const hasBottomSpace =
      window.innerHeight >
      anchorRect.bottom + selfHeight + (hideArrow ? 4 : ARROW_SIZE);

    if (anchorOrigin.vertical === "top" && !hasTopSpace && hasBottomSpace) {
      vertical = "bottom";
    } else if (
      anchorOrigin.vertical === "bottom" &&
      !hasBottomSpace &&
      hasTopSpace
    ) {
      vertical = "top";
    }

    if (vertical === "top") {
      selfTop = anchorRect.top - selfHeight - (hideArrow ? 4 : ARROW_SIZE);
      arrowTop = anchorRect.top - ARROW_SIZE * 1.5;
    } else if (vertical === "bottom") {
      selfTop = hideArrow
        ? anchorRect.bottom + 4
        : anchorRect.bottom + ARROW_SIZE;
      arrowTop = anchorRect.bottom + ARROW_SIZE / 2;
    }
    // Vertical End
  }

  return {
    selfLeft,
    selfTop,
    arrowLeft,
    arrowTop,
    vertical,
  } as const;
};

/**
 * The function `generateFileUrl` takes an optional `fileUrl` parameter and returns a URL by
 * concatenating it with the server endpoint if both `fileUrl` and `serverEndpoint` are provided.
 * @param {string} [fileUrl] - The `fileUrl` parameter is a string that represents the URL of a file.
 * @returns the concatenated string of the server endpoint and the file URL if both `fileUrl` and
 * `serverEndpoint` are provided. Otherwise, it returns `undefined`.
 */
export function generateFileUrl(fileUrl?: string) {
  const serverEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

  if (fileUrl && serverEndpoint) {
    return serverEndpoint + "/" + fileUrl;
  }
  return undefined;
}

/**
 * The function `getUserName` takes an object with properties `email` and `name`, and returns the name
 * if it exists, otherwise it returns the part of the email before the "@" symbol.
 * @param user - The `user` parameter is an object that should have either an `email` property or a
 * `name` property, or both. The `email` property should be a string representing the user's email
 * address, and the `name` property should be a string representing the user's name.
 * @returns the name of the user if it exists and is not empty. If the name is not available or empty,
 * it will return the part of the email before the "@" symbol.
 */
export function getUserName(user: Pick<IUser | User, "email" | "name">) {
  return user.name ? user.name.trim() : user.email.split("@")[0];
}

/**
 * The `gplErrorHandler` function handles errors returned from a GraphQL API and extracts error
 * messages from the response.
 * @param {ApolloError | undefined} error - The `error` parameter is of type `ApolloError | undefined`.
 * This means it can either be an instance of the `ApolloError` class or `undefined`.
 * @returns The function `gplErrorHandler` returns an array of error messages if there are any errors
 * in the `extensions.fields` array. If there are no errors in the `extensions.fields` array, it
 * returns the error message from the `ApolloError` object. If there is no error object, it returns
 * nothing.
 */
export const gplErrorHandler = (error: ApolloError | undefined) => {
  if (!error) {
    return;
  }
  const extensions = error.graphQLErrors[0]?.extensions;

  if (
    extensions &&
    "fields" in extensions &&
    Array.isArray(extensions.fields)
  ) {
    const results: string[] = [];

    extensions.fields.forEach((err: unknown) => {
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        results.push(err.message);
      }
    });

    return results.length ? results : error.message;
  }
  return error.message;
};
