// Local Storage key
export const RECENT_SEARCHES = "recent-searches";

// TABS
export const SEARCH_TABS = ["posts", "author", "categories", "tags"] as const;
export const MY_POSTS_TABS = ["drafts", "published"] as const;

export const ROUTES = {
  home: "/",
  myHome: "/my-home",
  search: "/search",
  post: (id: string) => `/posts/${id}`,
  createPost: "/posts/create",
  editPost: (id: string) => `/posts/${id}/edit`,
  authorProfile: (authorId: string) => `/account/author/${authorId}`,
  favorite: "/account/favorite",
  myPosts: "/account/posts",
  myPostsQuery: (tab: string) => `/account/posts?tab=${tab}`,
  notifications: "/account/notifications",
  accountSettings: "/account/settings",
};

export const IMAGE_MIMES = {
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const IMAGE_URL_REGEX =
  /(https?:\/\/.*\.(?:png|jpg|svg|jpeg|webp|gif))/i;

export const URL_REGEX =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
