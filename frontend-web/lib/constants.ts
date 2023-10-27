// Local Storage key
export const RECENT_SEARCHES_KEY = "recent-searches";
export const USER_KEY = "user";
export const NOTIFICATIONS_KEY = "notifications";
export const ABOUT_ME_KEY = "about-me";
export const CREATE_POST_KEY = "create-post";

export const ROUTES = {
  home: "/",
  login: "/account/login",
  register: "/account/register",
  myHome: "/home",
  myHomeFollowing: "/home?tab=following",
  search: "/search",
  post: (id: string) => `/posts/${id}`,
  categories: "/categories",
  postsByCategory: (id: string) => `/posts/category/${id}`,
  postsByTag: (id: string) => `/posts/tag/${id}`,
  createPost: "/posts/create",
  editPost: (id: string) => `/posts/${id}/edit`,
  authorProfile: (authorId: string) => `/account/${authorId}`,
  favorite: "/account/favorite",
  myPosts: "/account/posts",
  mySuggestions: "/account/suggestions",
  myPostsQuery: (tab: string) => `/account/posts?tab=${tab}`,
  notifications: "/account/notifications",
  accountSettings: "/account/settings",
  admin: {
    dashboard: "/admin",
    categories: "/admin/categories",
  },
} as const;
