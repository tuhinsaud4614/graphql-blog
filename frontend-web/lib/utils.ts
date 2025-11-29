import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import _has from "lodash/has";
import {
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Node,
  Range,
  Transforms,
} from "slate";
import { ReactEditor } from "slate-react";
import { twMerge } from "tailwind-merge";
import { ZodType, z } from "zod";

import { GetPostItemFragment, User } from "@/graphql/generated/schema";

import { BACKEND_API_URL, IMAGE_URL_REGEX, URL_REGEX } from "./constants";
import { isAuthUser, isDev } from "./isType";
import { IAnchorOrigin, IAuthUser, SlateLinkElement } from "./types";

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
  const serverEndpoint = BACKEND_API_URL;

  if (fileUrl && serverEndpoint) {
    return fileUrl.startsWith("http")
      ? fileUrl
      : `${serverEndpoint}${fileUrl.startsWith("/") ? fileUrl : "/" + fileUrl}`;
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
export function getUserName(user: Pick<IAuthUser | User, "email" | "name">) {
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
export const gplErrorHandler = (error: CombinedGraphQLErrors | undefined) => {
  if (!error) {
    return;
  }
  const extensions = error.extensions;

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

/**
 * The function `serializeOnlyTextSlateValue` takes a Slate value and returns a string containing only
 * the text content of the paragraphs in the value's children.
 * @param {Descendant[]} value - The `value` parameter is an array of Descendant objects. Each
 * Descendant object represents a node in a Slate editor value.
 * @returns The function `serializeOnlyTextSlateValue` returns a string that represents the text
 * content of the given `value` parameter.
 */
export const serializeOnlyTextSlateValue = (value: Descendant[]) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => {
        return ("type" in n &&
          ["heading-one", "heading-two"].includes(n["type"] as string)) ||
          "bold" in n ||
          "italic" in n ||
          "underline" in n
          ? Node.string(n)
          : " ";
      })
      .join("\n")
  );
};

/**
 * The function `readLocalStorageValue` reads a value from the browser's local storage and parses it
 * using a given schema, returning the parsed value or null if there is an error.
 * @param {T} schema - The `schema` parameter is a Zod schema that defines the expected shape and type
 * of the data stored in the local storage. It is used to parse and validate the data retrieved from
 * the local storage.
 * @param {string} key - The `key` parameter is a string that represents the key of the value you want
 * to read from the local storage.
 * @returns The function `readLocalStorageValue` returns a value of type `z.infer<T> | null`.
 */
export function readLocalStorageValue<T extends ZodType<unknown>>(
  schema: T,
  key: string,
): z.infer<T> | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return null;
    }
    const data = JSON.parse(item) as unknown;
    const parsed = schema.parse(data);
    return parsed;
  } catch (error) {
    isDev() && console.warn(`Error reading localStorage key “${key}”:`, error);

    return null;
  }
}

/**
 * The function sets a value in the local storage using the provided key and value.
 * @param {string} key - The `key` parameter is a string that represents the key under which the value
 * will be stored in the local storage.
 * @param {T} value - The `value` parameter is the value that you want to store in the local storage.
 * It can be of any type, as the function is generic and can handle any type of value.
 * @returns The function does not have an explicit return statement. Therefore, it returns `undefined`
 * by default.
 */
export const setLocalStorageValue = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    isDev() && console.warn(`Error writing localStorage “${key}”:`, error);
  }
};

/**
 * The function removes a value from the local storage using the provided key.
 * @param {string} key - The `key` parameter is a string that represents the key of the value you want
 * to remove from the local storage.
 * @returns The function does not have an explicit return statement. If the condition `typeof window
 * === "undefined"` is true, the function will return undefined. If the condition is false and the try
 * block is executed successfully, the function will also return undefined.
 */
export const removeLocalStorageValue = (key: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    isDev() && console.warn(`Error removing localStorage “${key}”:`, error);
  }
};

/**
 * The function `getAuthUser` decodes a JWT token and returns the decoded user information if it is
 * valid, otherwise it returns null.
 * @param {string} [token] - The `token` parameter is a string that represents a JSON Web Token (JWT).
 * It is used for authentication and contains information about the user.
 * @returns The function `getAuthUser` returns the decoded token if it exists and is a valid user,
 * otherwise it returns `null`.
 */
export const getAuthUser = (token?: string | null) => {
  if (!token) {
    return null;
  }

  const decoded = jwtDecode<any>(token);
  if (!isAuthUser(decoded)) {
    return null;
  }

  return decoded;
};

/**
 * The function fetchRefreshToken is an asynchronous function that sends a POST request to a GraphQL
 * endpoint to retrieve a token using a refresh token, and returns the token if it exists, otherwise it
 * returns null.
 * @returns The function `fetchRefreshToken` returns a `Promise` that resolves to a string, `null`, or
 * `undefined`.
 */
export async function fetchRefreshToken(
  refreshToken?: string,
): Promise<string | null | undefined> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!}/graphql`,
    {
      query: `
      query Token($refreshToken: String) {
        token(refreshToken: $refreshToken)
      }
    `,
      variables: { refreshToken: refreshToken },
    },
    {
      withCredentials: true,
    },
  );
  if (data && _has(data, "data") && _has(data.data, "token")) {
    return data.data.token as string;
  }
  return null;
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string } | null | undefined> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!}/graphql`,
    {
      query: `
      mutation Login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
          accessToken
          refreshToken
        }
      }
    `,
      variables: { email, password },
    },
    {
      withCredentials: true,
    },
  );
  if (data && _has(data, "data") && _has(data.data, "login")) {
    return data.data as { accessToken: string; refreshToken: string };
  }
  return null;
}

/**
 * The function `maxFileSize` calculates the maximum file size in bytes based on the given size in
 * megabytes. With `Decimal Prefixes` (10^n)
 * @param {number} mb - The parameter `mb` represents the size in megabytes.
 */
export const maxFileSize = (mb: number) => mb * 1000000;

/**
 * The function calculates the maximum file size in bytes based on the input size in MiB.
 * With `Binary Prefixes` (2^n)
 * @param {number} MiB - The parameter "MiB" represents the size of a file in Mebibytes (MiB).
 */
export const maxFileSizeInIb = (MiB: number) => MiB * 1024 * 1024;

/**
 * The `formatLocaleDate` function formats a given date into a string representation based on the
 * specified locale and options.
 * @param {Date | string | number} date - The `date` parameter can be of type `Date`, `string`, or
 * `number`. It represents the date that you want to format.
 * @param options - The `options` parameter is an optional object that allows you to customize the
 * formatting of the date. It accepts the following properties:
 * @returns a formatted string representation of the input date. If the formatting is successful, it
 * will return the formatted date string. If there is an error during formatting, it will return the
 * original input date as a string.
 */
export function formatLocaleDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric", // "numeric", "2-digit"
    month: "long", // "short", "long"
    day: "numeric", // "numeric", "2-digit",
  },
): string {
  try {
    // Example locale (replace with your desired locale, e.g., "en-US" for US English)
    const locale = "en-US";

    // Create the DateTimeFormat object with the specified locale and options
    const formatter = new Intl.DateTimeFormat(locale, options);

    // Format the date
    return formatter.format(new Date(isNaN(date as any) ? date : +date));
  } catch (_) {
    return date.toString();
  }
}

function gcd(width: number, height: number): number {
  return height == 0 ? width : gcd(height, width % height);
}

export function aspectRatio(width: number, height: number) {
  const result = gcd(width, height);

  return { left: width / result, right: height / result } as const;
}

// Start slate utils Start
export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  return marks ? marks[format] === true : false;
};

export function isBlockActive(
  editor: BaseEditor,
  format: string,
  blockType = "type",
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        n[blockType] === format,
    }),
  );

  return !!match;
}

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (url.match(IMAGE_URL_REGEX) === null) return false;
  return true;
};

export const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const withEmbeds = (editor: ReactEditor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    element.type === "video" ? true : isVoid(element);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return editor;
};

export const withImages = (editor: ReactEditor) => {
  const { isVoid, insertData } = editor;

  editor.isVoid = (element) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return editor;
};

export const isLinkActive = (editor: BaseEditor) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

export const unwrapLink = (editor: BaseEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};

export const wrapLink = (editor: BaseEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: SlateLinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const insertLink = (editor: BaseEditor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export function withLinks(editor: ReactEditor) {
  const { insertData, insertText, isInline } = editor;
  editor.isInline = (element) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    element.type === "link" || isInline(element);

  editor.insertText = (text: string) => {
    if (text && URL_REGEX.test(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && URL_REGEX.test(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return editor;
}

export function countConvert(count: number, text?: string, plural?: string) {
  const num = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
  if (!text) {
    return num;
  }

  if (count <= 1) {
    return `${num} ${text}`;
  }

  return `${num} ${plural ?? text + "s"}`;
}

function getPlainTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || ""; // Extracts plain text
}

export function getImageFromEditorJsBlocks(data: OutputData | null) {
  try {
    const blocks = data?.blocks;
    if (!Array.isArray(blocks)) {
      return null; // Return null if blocks are not an array
    }

    for (const block of blocks) {
      // Check if the block is an image block
      if (block.type === "image") {
        if (block.data && block.data.file && block.data.file.url) {
          return block.data.file.url as string | null; // Return the image URL if found
        }
      }
    }

    return null; // Return null if no image block is found
  } catch (error) {
    isDev() &&
      console.error("Error parsing post draft to extract image url:", error);
    return null;
  }
}

export function getTitleAndDescriptionFromEditorJsBlocks(
  blocks: OutputData["blocks"],
) {
  if (!Array.isArray(blocks)) {
    return {
      title: "",
      description: "",
    };
  }

  const texts: string[] = []; // Array to store found texts

  for (const block of blocks) {
    // Check if the block contains text
    if (block.type === "paragraph" || block.type === "header") {
      if (block.data && block.data.text) {
        // Clean the text to remove HTML tags or unwanted formatting
        const plainText = block.data.text.replace(/<[^>]*>/g, "").trim();
        if (plainText) {
          texts.push(getPlainTextFromHTML(plainText)); // Add meaningful text to the list
        }
      }
    }

    // Break the loop if we already have both title and description
    if (texts.length >= 2) {
      break;
    }
  }

  // Return the first and second text, or defaults if not found
  return {
    title: texts[0] || "", // First text as the title
    description: texts[1] || "", // Second text as the description
  };
}

export function getPostTitleFromDraft(draft: GetPostItemFragment["draft"]) {
  const parseContent = (data: unknown) => {
    const parsedData =
      typeof data === "string"
        ? JSON.parse(data)
        : typeof data === "object" && data !== null
          ? data
          : {};
    return getTitleAndDescriptionFromEditorJsBlocks(
      (parsedData as OutputData).blocks,
    );
  };

  try {
    const { title } = parseContent(draft);

    return title;
  } catch (error) {
    isDev() &&
      console.error("Error parsing post draft to extract title:", error);
    return null;
  }
}

export function getPostTitleAndDescription(
  post: Pick<GetPostItemFragment, "title" | "content" | "draft">,
  user?: IAuthUser,
  postAuthor?: GetPostItemFragment["author"],
) {
  const data = { title: "", description: "" };
  const { title, content, draft } = post;

  const parseContent = (data: unknown) => {
    const parsedData =
      typeof data === "string"
        ? JSON.parse(data)
        : typeof data === "object" && data !== null
          ? data
          : {};
    return getTitleAndDescriptionFromEditorJsBlocks(
      (parsedData as OutputData).blocks,
    );
  };

  try {
    if (title) {
      data.title = title;
    }

    if (content) {
      const { title: parsedTitle, description: parsedDescription } =
        parseContent(content);
      if (!data.title) {
        data.title = parsedTitle;
      }
      if (parsedDescription) {
        data.description = parsedDescription;
      }
    } else if (draft && user?.id && user.id === postAuthor?.id) {
      const { title: draftTitle, description: draftDescription } =
        parseContent(draft);
      if (!data.title) {
        data.title = draftTitle;
      }
      if (draftDescription) {
        data.description = draftDescription;
      }
    }

    return data;
  } catch (error) {
    isDev() && console.error("Error parsing post data:", error);
    return data; // Return default data in case of error
  }
}

/**
 * Checks if a query contains a specified query parameter and returns the index of
 * that parameter's value in a list of tabs. If the parameter is not found or is
 * not valid, a default value is returned.
 *
 * @template T - The type of the query object.
 * @param {T} query - The query object containing query parameters.
 * @param {string[] | Readonly<string[]>} tabs - An array of tab names or labels.
 * @param {keyof T} queryName - The key name of the query parameter to check within the query object.
 * @param {number} [defaultReturn=0] - The default value to return if the query parameter is not found or invalid.
 * @returns {number} - The index of the query parameter's value in the tabs array, or the default value.
 */

export function queryChecking<T extends { [key: string]: any }>(
  query: T,
  tabs: string[] | Readonly<string[]>,
  queryName: keyof T,
  defaultReturn = 0,
) {
  if (query && queryName in query && query[queryName]) {
    const tab = tabs.findIndex((t) => t === decodeURI(query[queryName]));
    return tab === -1 ? defaultReturn : tab;
  }
  return defaultReturn;
}
