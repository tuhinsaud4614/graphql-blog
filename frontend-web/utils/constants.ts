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
