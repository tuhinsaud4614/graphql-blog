export const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const BACKEND_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

// Local Storage key
export const RECENT_SEARCHES_KEY = "recent-searches";
export const USER_KEY = "user";
export const NOTIFICATIONS_KEY = "notifications";
export const ABOUT_ME_KEY = "about-me";
export const CREATE_POST_KEY = "create-post";

export const REFRESH_TOKEN_ERROR = "RefreshTokenError";

export const ROUTES = {
  landing: "/",
  search: "/search",
  account: {
    login: "/account/login",
    register: "/account/register",
    userVerify: "/account/verify",
    verifyPasswordReset: "/account/verify/reset-password",
  },
  user: {
    startWith: "/g/user",
    home: "/g/user/home",
    homeFollowings: "/g/user/home?tab=followings",
    postsByTag: (id: string) => `/g/user/posts/tag/${id}`,
    userProfile: (id: string) => `/g/user/${id}`,
    notifications: "/g/user/notifications",
    favorite: "/g/user/favorite",
    posts: "/g/user/posts",
    postCreate: "/posts/create",
    post: (id: string) => `/g/user/posts/${id}`,
    postsQuery: (tab: string) => `/g/user/posts?tab=${tab}`,
    postsByCategory: (id: string) => `/g/user/posts/category/${id}`,
    editPost: (id: string) => `/g/user/posts/${id}/edit`,
    suggestions: "/g/user/suggestions",
    settings: "/g/user/settings",
    search: "/g/user/search",
    categories: "/g/user/categories",
  },
  admin: {
    startWith: "/g/admin",
    dashboard: "/g/admin/dashboard",
    categories: "/g/admin/categories",
  },
} as const;

export const IMAGE_MIMES = {
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export const FORMAT_LOCALE_DATE_VARIANTS = {
  /** The Format: `November 12, 2023 at 10:12 PM` */
  a: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export const IMAGE_URL_REGEX =
  /(https?:\/\/.*\.(?:png|jpg|svg|jpeg|webp|gif))/i;
export const VALID_MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{11}$/;
export const URL_REGEX =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
export const VALID_EMAIL_REGEX =
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
