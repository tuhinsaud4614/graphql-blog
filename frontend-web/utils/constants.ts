// Local Storage key
export const RECENT_SEARCHES = "recent-searches";

// TABS
export const SEARCH_TABS = ["posts", "author", "categories", "tags"] as const;
export const MY_POSTS_TABS = ["drafts", "published"] as const;

export const ROUTES = {
  home: "/",
  myHome: "/my-home",
  search: "/search",
  favorite: "/account/favorite",
  myPosts: "/account/posts",
  myPostsQuery: (tab: string) => `/account/posts?tab=${tab}`,
  createPost: "/posts/create",
  editPost: (id: string) => `/posts/${id}/edit`,
  notifications: "/account/notifications",
};
