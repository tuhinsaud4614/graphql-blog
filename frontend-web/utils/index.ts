import { ApolloError } from "@apollo/client";
import { SSRRequestType, SSRResponseType, Value } from "@types";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import escapeHtml from "escape-html";
import { User } from "graphql/generated/schema";
import nodeFetch from "isomorphic-unfetch";
import jwtDecode from "jwt-decode";
import _ from "lodash";
import { BaseEditor, Editor, Element, Range, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { IMAGE_URL_REGEX, URL_REGEX, USER_KEY } from "./constants";
import { IAnchorOrigin, IUser, SlateLinkElement } from "./interfaces";

const ARROW_SIZE = 14;
export const getPositions = (
  anchorRect: DOMRect | null,
  selfRect: DOMRect | null,
  anchorOrigin: IAnchorOrigin,
  fraction?: boolean | number,
  hideArrow?: boolean
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

// Read local storage value
export const readLocalStorageValue = <T>(key: string): Value<T> => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    process.env.NODE_ENV === "development" &&
      console.warn(`Error reading localStorage key “${key}”:`, error);

    return null;
  }
};

// Set to local storage
export const setLocalStorageValue = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const item = window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    process.env.NODE_ENV === "development" &&
      console.warn(`Error writing localStorage “${key}”:`, error);
  }
};

// Remove to local storage
export const removeLocalStorageValue = (key: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    process.env.NODE_ENV === "development" &&
      console.warn(`Error removing localStorage “${key}”:`, error);
  }
};

// regex replace replace classes?: "min-w-[0]"; to classes?:string; -> \?:\s"(.*)"

// Serialize comment form slate editor
export const commentSerialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    // @ts-ignore
    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    return string;
  }

  //   @ts-ignore
  const children = node.children.map((n) => commentSerialize(n)).join("");
  return children;
};

export const maxFileSize = (mb: number) => mb * 1000000;

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
  //   @ts-ignore
  return marks ? marks[format] === true : false;
};

export function isBlockActive(
  editor: BaseEditor,
  format: string,
  blockType = "type"
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        // @ts-ignore
        n[blockType] === format,
    })
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
    // @ts-ignore
    element.type === "video" ? true : isVoid(element);
  return editor;
};

export const withImages = (editor: ReactEditor) => {
  const { isVoid, insertData } = editor;

  editor.isVoid = (element) => {
    // @ts-ignore
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

  return editor;
};

export const isLinkActive = (editor: BaseEditor) => {
  // @ts-ignore
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      // @ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

export const unwrapLink = (editor: BaseEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
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
    // @ts-ignore
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

  return editor;
}
// Start slate utils End

export function queryChecking<T extends { [key: string]: any }>(
  query: T,
  tabs: string[] | Readonly<string[]>,
  queryName: keyof T,
  defaultReturn = 0
) {
  if (query && queryName in query && query[queryName]) {
    const tab = tabs.findIndex((t) => t === decodeURI(query[queryName]));
    return tab === -1 ? defaultReturn : tab;
  }
  return defaultReturn;
}

export const removeAllSpacesFromText = (value: string) =>
  value.replace(/\s+/g, "");

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

    extensions.fields.forEach((err) => {
      if ("message" in err && typeof err.message === "string") {
        results.push(err.message);
      }
    });

    return results.length ? results : error.message;
  }
  return error.message;
};

export const getAuthUser = (
  token?: string,
  mode: "access" | "refresh" = "access"
) => {
  const newToken = token || getCookie(`${mode}Token`);

  if (!newToken || typeof newToken !== "string") {
    return null;
  }

  const decoded = jwtDecode<any>(newToken);
  const user = _.omit(decoded, ["followers", "followings"]) as IUser;
  if (!_.has(user, "email")) {
    return null;
  }

  return user;
};

export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";

export function getUserName(user: Pick<IUser | User, "email" | "name">) {
  return user.name ? user.name.trim() : user.email.split("@")[0];
}

export function generateFileUrl(fileUrl?: string) {
  const serverEndpoint =
    process.env.NEXT_PUBLIC_SERVER_ENDPOINT || "http://localhost:4000";

  if (fileUrl && serverEndpoint) {
    return serverEndpoint + "/" + fileUrl;
  }
  return undefined;
}

const query = `
      mutation Token($refreshToken: String!) {
        token(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `;
export async function fetchRefreshToken(token: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        refreshToken: token,
      },
    }),
  });
  return response.json();
}

export function storeTokenToCookie(
  accessToken: string,
  refreshToken: string,
  req?: SSRRequestType,
  res?: SSRResponseType
) {
  const user = getAuthUser(accessToken);
  const user1 = getAuthUser(refreshToken);
  setCookie("accessToken", accessToken, { maxAge: user?.exp, req, res });
  setCookie("refreshToken", refreshToken, { maxAge: user1?.exp, req, res });
  return user;
}

export function removeTokenFromCookie(
  req?: SSRRequestType,
  res?: SSRResponseType
) {
  deleteCookie("accessToken", { req, res });
  deleteCookie("refreshToken", { req, res });
}

export async function serverSideTokenRotation(
  req?: SSRRequestType,
  res?: SSRResponseType
) {
  try {
    const token = getCookie("refreshToken", { req, res }) as string;
    if (!token) {
      return null;
    }

    const response = await nodeFetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            refreshToken: token,
          },
        }),
      }
    );

    const result = await response.json();

    const accessToken = result.data.token.accessToken;
    const refreshToken = result.data.token.refreshToken;

    if (accessToken && refreshToken) {
      storeTokenToCookie(accessToken, refreshToken, req, res);
      return { accessToken, refreshToken };
    }
    removeLocalStorageValue(USER_KEY);
    removeTokenFromCookie(req, res);
    return null;
  } catch (error) {
    removeLocalStorageValue(USER_KEY);
    removeTokenFromCookie(req, res);
    return null;
  }
}
