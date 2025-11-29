/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  File: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthorCache = {
  __typename?: 'AuthorCache';
  authorId: Scalars['ID']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  posts: Array<Post>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CategoryCache = {
  __typename?: 'CategoryCache';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  commenter: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  parentComment?: Maybe<Comment>;
  replies: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  postId: Scalars['ID']['input'];
};

export type CreatePostInput = {
  categories: Array<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  image: Scalars['File']['input'];
  published: Scalars['Boolean']['input'];
  tags: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type CursorBookmarkEdge = {
  __typename?: 'CursorBookmarkEdge';
  cursor: Scalars['ID']['output'];
  node: Bookmark;
};

export type CursorBookmarksResponse = {
  __typename?: 'CursorBookmarksResponse';
  edges: Array<CursorBookmarkEdge>;
  pageInfo: CursorPageInfo;
  total: Scalars['Int']['output'];
};

export type CursorCommentEdge = {
  __typename?: 'CursorCommentEdge';
  cursor: Scalars['ID']['output'];
  node: Comment;
};

export type CursorCommentsResponse = {
  __typename?: 'CursorCommentsResponse';
  edges: Array<CursorCommentEdge>;
  pageInfo: CursorPageInfo;
  total: Scalars['Int']['output'];
};

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  endCursor?: Maybe<Scalars['ID']['output']>;
  hasNext: Scalars['Boolean']['output'];
};

export type CursorPostEdge = {
  __typename?: 'CursorPostEdge';
  cursor: Scalars['ID']['output'];
  node: Post;
};

export type CursorPostsResponse = {
  __typename?: 'CursorPostsResponse';
  edges: Array<CursorPostEdge>;
  pageInfo: CursorPageInfo;
  total: Scalars['Int']['output'];
};

export type CursorUserEdge = {
  __typename?: 'CursorUserEdge';
  cursor: Scalars['ID']['output'];
  node: User;
};

export type CursorUserResponse = {
  __typename?: 'CursorUserResponse';
  edges: Array<CursorUserEdge>;
  pageInfo: CursorPageInfo;
  total: Scalars['Int']['output'];
};

export enum EReactionsMutationStatus {
  React = 'REACT',
  Withdraw = 'WITHDRAW'
}

export enum EToggleMutationStatus {
  Added = 'ADDED',
  Removed = 'REMOVED'
}

export enum FollowingMutationStatus {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createCategory: Category;
  createComment: Comment;
  createPost: Post;
  createTag: Tag;
  createUntitledPost: Post;
  deleteBookmark: Scalars['ID']['output'];
  deleteCategory: Scalars['ID']['output'];
  deleteComment: Scalars['ID']['output'];
  deletePost: Scalars['ID']['output'];
  deleteTag: Scalars['ID']['output'];
  deleteUser: Scalars['ID']['output'];
  followRequest: User;
  login: TokensResponse;
  logout: Scalars['ID']['output'];
  publishPost: Scalars['String']['output'];
  reactionToPost: EReactionsMutationStatus;
  register: Scalars['ID']['output'];
  resendActivation: Scalars['ID']['output'];
  resetPassword: Scalars['String']['output'];
  toggleBookmark: EToggleMutationStatus;
  unFollowRequest: Scalars['ID']['output'];
  updateAbout: Scalars['String']['output'];
  updateCategory: Category;
  updateComment: Comment;
  updateDraft: Scalars['String']['output'];
  updateName: Scalars['String']['output'];
  updatePost: Post;
  updateTag: Tag;
  uploadAvatar: Picture;
  uploadFile: Scalars['String']['output'];
  uploadImage: Scalars['String']['output'];
  verifyResetPassword: Scalars['String']['output'];
  verifyUser: Scalars['ID']['output'];
};


export type MutationCreateBookmarkArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  data?: InputMaybe<CreateCommentInput>;
};


export type MutationCreatePostArgs = {
  data?: InputMaybe<CreatePostInput>;
};


export type MutationCreateTagArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationFollowRequestArgs = {
  toId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data?: InputMaybe<LoginInput>;
};


export type MutationPublishPostArgs = {
  data?: InputMaybe<PublishPostInput>;
};


export type MutationReactionToPostArgs = {
  toId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  data?: InputMaybe<RegisterInput>;
};


export type MutationResendActivationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
  verificationLink: Scalars['String']['input'];
};


export type MutationToggleBookmarkArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationUnFollowRequestArgs = {
  toId: Scalars['ID']['input'];
};


export type MutationUpdateAboutArgs = {
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  data?: InputMaybe<UpdateCommentInput>;
};


export type MutationUpdateDraftArgs = {
  data?: InputMaybe<UpdatePostDraftInput>;
};


export type MutationUpdateNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  data?: InputMaybe<UpdatePostInput>;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUploadAvatarArgs = {
  image: Scalars['File']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['File']['input'];
};


export type MutationUploadImageArgs = {
  image: Scalars['File']['input'];
};


export type MutationVerifyResetPasswordArgs = {
  code: Scalars['String']['input'];
};


export type MutationVerifyUserArgs = {
  code: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type OffsetBookmarksResponse = {
  __typename?: 'OffsetBookmarksResponse';
  data: Array<Bookmark>;
  pageInfo?: Maybe<OffsetPageInfo>;
  total: Scalars['Int']['output'];
};

export type OffsetCommentsResponse = {
  __typename?: 'OffsetCommentsResponse';
  data: Array<Comment>;
  pageInfo?: Maybe<OffsetPageInfo>;
  total: Scalars['Int']['output'];
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  hasNext: Scalars['Boolean']['output'];
  nextPage: Scalars['Int']['output'];
  previousPage: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type OffsetPostsResponse = {
  __typename?: 'OffsetPostsResponse';
  data: Array<Post>;
  pageInfo?: Maybe<OffsetPageInfo>;
  total: Scalars['Int']['output'];
};

export type OffsetTagsResponse = {
  __typename?: 'OffsetTagsResponse';
  pageInfo?: Maybe<OffsetPageInfo>;
  results: Array<Tag>;
  total: Scalars['Int']['output'];
};

export type PaginateCategories = {
  __typename?: 'PaginateCategories';
  data: Array<Category>;
  pageInfo?: Maybe<OffsetPageInfo>;
  total: Scalars['Int']['output'];
};

export type PaginateUsers = {
  __typename?: 'PaginateUsers';
  data: Array<User>;
  pageInfo?: Maybe<OffsetPageInfo>;
  total: Scalars['Int']['output'];
};

export type Picture = {
  __typename?: 'Picture';
  createdAt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  categories: Array<Category>;
  comments: Array<Comment>;
  content?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['String']['output'];
  draft?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Picture>;
  published: Scalars['Boolean']['output'];
  publishedAt?: Maybe<Scalars['String']['output']>;
  reactionsBy: Array<User>;
  tags: Array<Tag>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type PostCache = {
  __typename?: 'PostCache';
  author: AuthorCache;
  categories: Array<CategoryCache>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  tags: Array<TagCache>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PostCount = {
  __typename?: 'PostCount';
  published: Scalars['Int']['output'];
  unpublished: Scalars['Int']['output'];
};

export type PublishPostInput = {
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authorFollowersWithCursor: CursorUserResponse;
  authorFollowingsWithCursor: CursorUserResponse;
  bookmarkCount: Scalars['Int']['output'];
  categoriesByTextWithOffset: PaginateCategories;
  categoriesWithOffset: PaginateCategories;
  categoryCount: Scalars['Int']['output'];
  followingAuthorPosts: CursorPostsResponse;
  isBookmarked: Scalars['Boolean']['output'];
  post: Post;
  postCommentsCount: Scalars['Int']['output'];
  postCommentsWithCursor: CursorCommentsResponse;
  postCommentsWithOffset: OffsetCommentsResponse;
  postCount: PostCount;
  postReactedBy: CursorUserResponse;
  postReactionsCount: ReactionsCount;
  postsByTagWithOffset: OffsetPostsResponse;
  postsWithCursor: CursorPostsResponse;
  postsWithOffset: OffsetPostsResponse;
  recommendAuthorsWithOffset: PaginateUsers;
  tagCount: Scalars['Int']['output'];
  tagsByTextWithOffset: OffsetTagsResponse;
  tagsWithOffset: OffsetTagsResponse;
  token: Scalars['String']['output'];
  trendingPosts: Array<Post>;
  user: User;
  userBookmarksWithCursor: CursorBookmarksResponse;
  userBookmarksWithOffset: OffsetBookmarksResponse;
  userCount: Scalars['Int']['output'];
  userFollow: UserFollowResponse;
  userFollowers: Scalars['Int']['output'];
  userFollowings: Scalars['Int']['output'];
  userResult: UserResultResponse;
  usersWithOffset: PaginateUsers;
};


export type QueryAuthorFollowersWithCursorArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryAuthorFollowingsWithCursorArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryCategoriesByTextWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type QueryCategoriesWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFollowingAuthorPostsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryIsBookmarkedArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostCommentsCountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostCommentsWithCursorArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  postId: Scalars['ID']['input'];
};


export type QueryPostCommentsWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['ID']['input'];
};


export type QueryPostReactedByArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
};


export type QueryPostReactionsCountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsByTagWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tag: Scalars['String']['input'];
};


export type QueryPostsWithCursorArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryPostsWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecommendAuthorsWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTagsByTextWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type QueryTagsWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserBookmarksWithCursorArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryUserBookmarksWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserFollowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserFollowersArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserFollowingsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserResultArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersWithOffsetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type ReactionToPostResult = {
  __typename?: 'ReactionToPostResult';
  mutation: EReactionsMutationStatus;
  reactBy: User;
};

export type ReactionsCount = {
  __typename?: 'ReactionsCount';
  count: Scalars['Int']['output'];
  reacted: Scalars['Boolean']['output'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  verificationLink: Scalars['String']['input'];
};

export enum RegisterUserRole {
  Author = 'AUTHOR',
  User = 'USER'
}

export type SubFollowedBy = {
  __typename?: 'SubFollowedBY';
  followedBy: User;
  mutation: FollowingMutationStatus;
};

export type SubUserStatus = {
  __typename?: 'SubUserStatus';
  mutation: UserMutationStatus;
  userId: Scalars['ID']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  following: SubFollowedBy;
  postPublishToCache: PostCache;
  reactions: ReactionToPostResult;
  userVerify: SubUserStatus;
};


export type SubscriptionPostPublishToCacheArgs = {
  postId: Scalars['ID']['input'];
};


export type SubscriptionReactionsArgs = {
  post: Scalars['ID']['input'];
};


export type SubscriptionUserVerifyArgs = {
  userId: Scalars['ID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  posts: Array<Post>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TagCache = {
  __typename?: 'TagCache';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type TokensResponse = {
  __typename?: 'TokensResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdatePostDraftInput = {
  draft: Scalars['JSON']['input'];
  id: Scalars['ID']['input'];
};

export type UpdatePostInput = {
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['File']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Picture>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers: Array<UserFollow>;
  followings: Array<UserFollow>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
  role: UserRole;
  updatedAt: Scalars['String']['output'];
  userStatus?: Maybe<UserStatus>;
};

export type UserFollow = {
  __typename?: 'UserFollow';
  avatar?: Maybe<Picture>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type UserFollowResponse = {
  __typename?: 'UserFollowResponse';
  followerCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
};

export enum UserMutationStatus {
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

export type UserResultResponse = {
  __typename?: 'UserResultResponse';
  followerCount: Scalars['Int']['output'];
  hasFollow: Scalars['Boolean']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Author = 'AUTHOR'
}

export enum UserStatus {
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokensResponse', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  verificationLink: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type UserVerificationMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  code: Scalars['String']['input'];
}>;


export type UserVerificationMutation = { __typename?: 'Mutation', verifyUser: string };

export type ResendActivationLinkMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ResendActivationLinkMutation = { __typename?: 'Mutation', resendActivation: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ResetPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  verificationLink: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type VerifyResetPasswordMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyResetPasswordMutation = { __typename?: 'Mutation', verifyResetPassword: string };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type TokenQueryVariables = Exact<{
  refreshToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type TokenQuery = { __typename?: 'Query', token: string };

export type CreateBookmarkMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: (
    { __typename?: 'Bookmark' }
    & { ' $fragmentRefs'?: { 'FBookmarkFragment': FBookmarkFragment } }
  ) };

export type DeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBookmarkMutation = { __typename?: 'Mutation', deleteBookmark: string };

export type ToggleBookmarkMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type ToggleBookmarkMutation = { __typename?: 'Mutation', toggleBookmark: EToggleMutationStatus };

export type UserBookmarksWithCursorQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UserBookmarksWithCursorQuery = { __typename?: 'Query', userBookmarksWithCursor: { __typename?: 'CursorBookmarksResponse', total: number, edges: Array<{ __typename?: 'CursorBookmarkEdge', cursor: string, node: (
        { __typename?: 'Bookmark' }
        & { ' $fragmentRefs'?: { 'FBookmarkFragment': FBookmarkFragment } }
      ) }>, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ) } };

export type IsBookmarkedQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type IsBookmarkedQuery = { __typename?: 'Query', isBookmarked: boolean };

export type CreateCategoryMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'FCategoryFragment': FCategoryFragment } }
  ) };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'FCategoryFragment': FCategoryFragment } }
  ) };

export type GetCategoriesWithOffsetQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCategoriesWithOffsetQuery = { __typename?: 'Query', categoriesWithOffset: { __typename?: 'PaginateCategories', total: number, data: Array<(
      { __typename?: 'Category' }
      & { ' $fragmentRefs'?: { 'FCategoryFragment': FCategoryFragment } }
    )>, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null } };

export type GetCategoriesByTextWithOffsetQueryVariables = Exact<{
  text: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCategoriesByTextWithOffsetQuery = { __typename?: 'Query', categoriesByTextWithOffset: { __typename?: 'PaginateCategories', total: number, data: Array<(
      { __typename?: 'Category' }
      & { ' $fragmentRefs'?: { 'FCategoryFragment': FCategoryFragment } }
    )>, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null } };

export type GetCategoryCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryCountQuery = { __typename?: 'Query', categoryCount: number };

export type CreateCommentMutationVariables = Exact<{
  data: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'FCommentFragment': FCommentFragment } }
  ) };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: string };

export type UpdateCommentMutationVariables = Exact<{
  data: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'FCommentFragment': FCommentFragment } }
  ) };

export type GetPostCommentsWithCursorQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPostCommentsWithCursorQuery = { __typename?: 'Query', postCommentsWithCursor: { __typename?: 'CursorCommentsResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorCommentEdge', cursor: string, node: (
        { __typename?: 'Comment' }
        & { ' $fragmentRefs'?: { 'FCommentWithRepliesFragment': FCommentWithRepliesFragment } }
      ) }> } };

export type UploadImageMutationVariables = Exact<{
  image: Scalars['File']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type FOffsetPageInfoFragment = { __typename?: 'OffsetPageInfo', hasNext: boolean, nextPage: number, previousPage: number, totalPages: number } & { ' $fragmentName'?: 'FOffsetPageInfoFragment' };

export type FCursorPageInfoFragment = { __typename?: 'CursorPageInfo', hasNext: boolean, endCursor?: string | null } & { ' $fragmentName'?: 'FCursorPageInfoFragment' };

export type FImageFragment = { __typename?: 'Picture', id: string, url: string, height: number, width: number } & { ' $fragmentName'?: 'FImageFragment' };

export type FUserFragment = { __typename?: 'User', id: string, name?: string | null, email: string, role: UserRole, userStatus?: UserStatus | null, about?: string | null, avatar?: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'FImageFragment': FImageFragment } }
  ) | null } & { ' $fragmentName'?: 'FUserFragment' };

export type FCategoryFragment = { __typename?: 'Category', id: string, title: string, createdAt: string, updatedAt: string } & { ' $fragmentName'?: 'FCategoryFragment' };

export type FTagFragment = { __typename?: 'Tag', id: string, title: string, createdAt: string, updatedAt: string } & { ' $fragmentName'?: 'FTagFragment' };

export type GetPostItemFragment = { __typename?: 'Post', id: string, title?: string | null, published: boolean, publishedAt?: string | null, content?: any | null, draft?: any | null, createdAt: string, updatedAt: string, author: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ), categories: Array<{ __typename?: 'Category', id: string, title: string }>, image?: { __typename?: 'Picture', id: string, url: string, height: number, width: number } | null, tags: Array<{ __typename?: 'Tag', id: string, title: string }> } & { ' $fragmentName'?: 'GetPostItemFragment' };

export type TagItemFragment = { __typename?: 'Tag', id: string, title: string, createdAt: string, updatedAt: string } & { ' $fragmentName'?: 'TagItemFragment' };

export type FCommentFragment = { __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, commenter: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ), parentComment?: { __typename?: 'Comment', id: string } | null } & { ' $fragmentName'?: 'FCommentFragment' };

export type FCommentWithRepliesFragment = { __typename?: 'Comment', id: string, content: string, createdAt: string, updatedAt: string, replies: number, commenter: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ), parentComment?: { __typename?: 'Comment', id: string } | null } & { ' $fragmentName'?: 'FCommentWithRepliesFragment' };

export type FBookmarkFragment = { __typename?: 'Bookmark', id: string, createdAt: string, updatedAt: string, user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ), post: (
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
  ) } & { ' $fragmentName'?: 'FBookmarkFragment' };

export type CreateUntitledPostMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUntitledPostMutation = { __typename?: 'Mutation', createUntitledPost: (
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
  ) };

export type UpdatePostDraftMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  draft: Scalars['JSON']['input'];
}>;


export type UpdatePostDraftMutation = { __typename?: 'Mutation', updateDraft: string };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: string };

export type PublishPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type PublishPostMutation = { __typename?: 'Mutation', publishPost: string };

export type ReactToPostMutationVariables = Exact<{
  toId: Scalars['ID']['input'];
}>;


export type ReactToPostMutation = { __typename?: 'Mutation', reactionToPost: EReactionsMutationStatus };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['File']['input']>;
  categories?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: (
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
  ) };

export type GetTrendingPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendingPostsQuery = { __typename?: 'Query', trendingPosts: Array<{ __typename?: 'Post', id: string, title?: string | null, content?: any | null, updatedAt: string, author: { __typename?: 'User', id: string, name?: string | null, email: string, avatar?: (
        { __typename?: 'Picture' }
        & { ' $fragmentRefs'?: { 'FImageFragment': FImageFragment } }
      ) | null } }> };

export type GetPostsWithCursorQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPostsWithCursorQuery = { __typename?: 'Query', postsWithCursor: { __typename?: 'CursorPostsResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorPostEdge', cursor: string, node: (
        { __typename?: 'Post' }
        & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
      ) }> } };

export type GetPostsWithOffsetQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsWithOffsetQuery = { __typename?: 'Query', postsWithOffset: { __typename?: 'OffsetPostsResponse', total: number, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null, data: Array<(
      { __typename?: 'Post' }
      & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
    )> } };

export type GetPostCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostCountQuery = { __typename?: 'Query', postCount: { __typename?: 'PostCount', published: number, unpublished: number } };

export type GetPostWithAuthorIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostWithAuthorIdQuery = { __typename?: 'Query', post: (
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
  ) };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', post: (
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
  ) };

export type GetPostReactionsCountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostReactionsCountQuery = { __typename?: 'Query', postReactionsCount: { __typename?: 'ReactionsCount', count: number, reacted: boolean } };

export type GetPostCommentsCountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostCommentsCountQuery = { __typename?: 'Query', postCommentsCount: number };

export type GetPostReactedByQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPostReactedByQuery = { __typename?: 'Query', postReactedBy: { __typename?: 'CursorUserResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorUserEdge', cursor: string, node: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
      ) }> } };

export type GetFollowingAuthorPostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetFollowingAuthorPostsQuery = { __typename?: 'Query', followingAuthorPosts: { __typename?: 'CursorPostsResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorPostEdge', cursor: string, node: (
        { __typename?: 'Post' }
        & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
      ) }> } };

export type GetTagsWithOffsetQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTagsWithOffsetQuery = { __typename?: 'Query', tagsWithOffset: { __typename?: 'OffsetTagsResponse', total: number, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null, results: Array<(
      { __typename?: 'Tag' }
      & { ' $fragmentRefs'?: { 'TagItemFragment': TagItemFragment } }
    )> } };

export type GetTagsByTextWithOffsetQueryVariables = Exact<{
  text: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTagsByTextWithOffsetQuery = { __typename?: 'Query', tagsByTextWithOffset: { __typename?: 'OffsetTagsResponse', total: number, results: Array<(
      { __typename?: 'Tag' }
      & { ' $fragmentRefs'?: { 'TagItemFragment': TagItemFragment } }
    )>, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null } };

export type GetTagCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagCountQuery = { __typename?: 'Query', tagCount: number };

export type CreateTagMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'FTagFragment': FTagFragment } }
  ) };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: string };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'FTagFragment': FTagFragment } }
  ) };

export type UploadAvatarMutationVariables = Exact<{
  avatar: Scalars['File']['input'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'FImageFragment': FImageFragment } }
  ) };

export type UpdateNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UpdateNameMutation = { __typename?: 'Mutation', updateName: string };

export type UpdateAboutMutationVariables = Exact<{
  value?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAboutMutation = { __typename?: 'Mutation', updateAbout: string };

export type SendFollowRequestMutationVariables = Exact<{
  toId: Scalars['ID']['input'];
}>;


export type SendFollowRequestMutation = { __typename?: 'Mutation', followRequest: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ) };

export type SendUnFollowRequestMutationVariables = Exact<{
  toId: Scalars['ID']['input'];
}>;


export type SendUnFollowRequestMutation = { __typename?: 'Mutation', unFollowRequest: string };

export type RecommendAuthorsWithOffsetQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RecommendAuthorsWithOffsetQuery = { __typename?: 'Query', recommendAuthorsWithOffset: { __typename?: 'PaginateUsers', total: number, data: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
    )>, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null } };

export type GetUsersWithOffsetQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersWithOffsetQuery = { __typename?: 'Query', usersWithOffset: { __typename?: 'PaginateUsers', total: number, data: Array<(
      { __typename?: 'User', updatedAt: string }
      & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
    )>, pageInfo?: (
      { __typename?: 'OffsetPageInfo' }
      & { ' $fragmentRefs'?: { 'FOffsetPageInfoFragment': FOffsetPageInfoFragment } }
    ) | null } };

export type GetUserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCountQuery = { __typename?: 'Query', userCount: number };

export type GetUserWithPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserWithPostQuery = { __typename?: 'Query', user: (
    { __typename?: 'User', posts: Array<(
      { __typename?: 'Post' }
      & { ' $fragmentRefs'?: { 'GetPostItemFragment': GetPostItemFragment } }
    )>, followings: Array<{ __typename?: 'UserFollow', id: string, name?: string | null, email: string, avatar?: (
        { __typename?: 'Picture' }
        & { ' $fragmentRefs'?: { 'FImageFragment': FImageFragment } }
      ) | null }>, followers: Array<{ __typename?: 'UserFollow', id: string, name?: string | null, email: string, avatar?: (
        { __typename?: 'Picture' }
        & { ' $fragmentRefs'?: { 'FImageFragment': FImageFragment } }
      ) | null }> }
    & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
  ) };

export type UserMentionTooltipStatsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserMentionTooltipStatsQuery = { __typename?: 'Query', userResult: { __typename?: 'UserResultResponse', followerCount: number, hasFollow: boolean } };

export type GetAuthorFollowersWithCursorQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorFollowersWithCursorQuery = { __typename?: 'Query', authorFollowersWithCursor: { __typename?: 'CursorUserResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorUserEdge', cursor: string, node: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
      ) }> } };

export type GetAuthorFollowingsWithCursorQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorFollowingsWithCursorQuery = { __typename?: 'Query', authorFollowingsWithCursor: { __typename?: 'CursorUserResponse', total: number, pageInfo: (
      { __typename?: 'CursorPageInfo' }
      & { ' $fragmentRefs'?: { 'FCursorPageInfoFragment': FCursorPageInfoFragment } }
    ), edges: Array<{ __typename?: 'CursorUserEdge', cursor: string, node: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
      ) }> } };

export type GetUserFollowersQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserFollowersQuery = { __typename?: 'Query', userFollowers: number };

export type GetUserFollowingsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserFollowingsQuery = { __typename?: 'Query', userFollowings: number };

export type FollowingSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FollowingSubscription = { __typename?: 'Subscription', following: { __typename?: 'SubFollowedBY', mutation: FollowingMutationStatus, followedBy: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'FUserFragment': FUserFragment } }
    ) } };

export const FOffsetPageInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<FOffsetPageInfoFragment, unknown>;
export const FCursorPageInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<FCursorPageInfoFragment, unknown>;
export const FCategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FCategoryFragment, unknown>;
export const FTagFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FTagFragment, unknown>;
export const TagItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<TagItemFragment, unknown>;
export const FImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<FImageFragment, unknown>;
export const FUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<FUserFragment, unknown>;
export const FCommentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FComment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<FCommentFragment, unknown>;
export const FCommentWithRepliesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCommentWithReplies"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"replies"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<FCommentWithRepliesFragment, unknown>;
export const GetPostItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<GetPostItemFragment, unknown>;
export const FBookmarkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FBookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmark"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FBookmarkFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verificationLink"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"verificationLink"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verificationLink"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UserVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<UserVerificationMutation, UserVerificationMutationVariables>;
export const ResendActivationLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendActivationLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendActivation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verificationLink"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"verificationLink"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verificationLink"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyResetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyResetPasswordMutation, VerifyResetPasswordMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const TokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Token"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}]}]}}]} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FBookmark"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FBookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmark"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const DeleteBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;
export const ToggleBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<ToggleBookmarkMutation, ToggleBookmarkMutationVariables>;
export const UserBookmarksWithCursorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserBookmarksWithCursor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userBookmarksWithCursor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FBookmark"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FBookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmark"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<UserBookmarksWithCursorQuery, UserBookmarksWithCursorQueryVariables>;
export const IsBookmarkedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsBookmarked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isBookmarked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<IsBookmarkedQuery, IsBookmarkedQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetCategoriesWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoriesWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoriesWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetCategoriesWithOffsetQuery, GetCategoriesWithOffsetQueryVariables>;
export const GetCategoriesByTextWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoriesByTextWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoriesByTextWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetCategoriesByTextWithOffsetQuery, GetCategoriesByTextWithOffsetQueryVariables>;
export const GetCategoryCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryCount"}}]}}]} as unknown as DocumentNode<GetCategoryCountQuery, GetCategoryCountQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FComment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FComment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FComment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FComment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const GetPostCommentsWithCursorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostCommentsWithCursor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCommentsWithCursor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCommentWithReplies"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCommentWithReplies"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"replies"}}]}}]} as unknown as DocumentNode<GetPostCommentsWithCursorQuery, GetPostCommentsWithCursorQueryVariables>;
export const UploadImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}]}]}}]} as unknown as DocumentNode<UploadImageMutation, UploadImageMutationVariables>;
export const CreateUntitledPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUntitledPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUntitledPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateUntitledPostMutation, CreateUntitledPostMutationVariables>;
export const UpdatePostDraftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePostDraft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"draft"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"draft"},"value":{"kind":"Variable","name":{"kind":"Name","value":"draft"}}}]}}]}]}}]} as unknown as DocumentNode<UpdatePostDraftMutation, UpdatePostDraftMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const PublishPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}]}}]}]}}]} as unknown as DocumentNode<PublishPostMutation, PublishPostMutationVariables>;
export const ReactToPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReactToPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactionToPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toId"}}}]}]}}]} as unknown as DocumentNode<ReactToPostMutation, ReactToPostMutationVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"published"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"published"},"value":{"kind":"Variable","name":{"kind":"Name","value":"published"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const GetTrendingPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrendingPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trendingPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>;
export const GetPostsWithCursorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostsWithCursor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsWithCursor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPostsWithCursorQuery, GetPostsWithCursorQueryVariables>;
export const GetPostsWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostsWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPostsWithOffsetQuery, GetPostsWithOffsetQueryVariables>;
export const GetPostCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"unpublished"}}]}}]}}]} as unknown as DocumentNode<GetPostCountQuery, GetPostCountQueryVariables>;
export const GetPostWithAuthorIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostWithAuthorId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPostWithAuthorIdQuery, GetPostWithAuthorIdQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostReactionsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostReactionsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReactionsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"reacted"}}]}}]}}]} as unknown as DocumentNode<GetPostReactionsCountQuery, GetPostReactionsCountQueryVariables>;
export const GetPostCommentsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostCommentsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<GetPostCommentsCountQuery, GetPostCommentsCountQueryVariables>;
export const GetPostReactedByDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostReactedBy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReactedBy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<GetPostReactedByQuery, GetPostReactedByQueryVariables>;
export const GetFollowingAuthorPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowingAuthorPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followingAuthorPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetFollowingAuthorPostsQuery, GetFollowingAuthorPostsQueryVariables>;
export const GetTagsWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTagsWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagsWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetTagsWithOffsetQuery, GetTagsWithOffsetQueryVariables>;
export const GetTagsByTextWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTagsByTextWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagsByTextWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetTagsByTextWithOffsetQuery, GetTagsByTextWithOffsetQueryVariables>;
export const GetTagCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTagCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagCount"}}]}}]} as unknown as DocumentNode<GetTagCountQuery, GetTagCountQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FTag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FTag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const UploadAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const UpdateNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<UpdateNameMutation, UpdateNameMutationVariables>;
export const UpdateAboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAbout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAbout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}]}}]} as unknown as DocumentNode<UpdateAboutMutation, UpdateAboutMutationVariables>;
export const SendFollowRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFollowRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<SendFollowRequestMutation, SendFollowRequestMutationVariables>;
export const SendUnFollowRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendUnFollowRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollowRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toId"}}}]}]}}]} as unknown as DocumentNode<SendUnFollowRequestMutation, SendUnFollowRequestMutationVariables>;
export const RecommendAuthorsWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecommendAuthorsWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendAuthorsWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<RecommendAuthorsWithOffsetQuery, RecommendAuthorsWithOffsetQueryVariables>;
export const GetUsersWithOffsetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithOffset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersWithOffset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FOffsetPageInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FOffsetPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"previousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetUsersWithOffsetQuery, GetUsersWithOffsetQueryVariables>;
export const GetUserCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCount"}}]}}]} as unknown as DocumentNode<GetUserCountQuery, GetUserCountQueryVariables>;
export const GetUserWithPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserWithPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetPostItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetPostItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetUserWithPostQuery, GetUserWithPostQueryVariables>;
export const UserMentionTooltipStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserMentionTooltipStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasFollow"}}]}}]}}]} as unknown as DocumentNode<UserMentionTooltipStatsQuery, UserMentionTooltipStatsQueryVariables>;
export const GetAuthorFollowersWithCursorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorFollowersWithCursor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorFollowersWithCursor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<GetAuthorFollowersWithCursorQuery, GetAuthorFollowersWithCursorQueryVariables>;
export const GetAuthorFollowingsWithCursorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorFollowingsWithCursor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorFollowingsWithCursor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FCursorPageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FCursorPageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CursorPageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<GetAuthorFollowingsWithCursorQuery, GetAuthorFollowingsWithCursorQueryVariables>;
export const GetUserFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<GetUserFollowersQuery, GetUserFollowersQueryVariables>;
export const GetUserFollowingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFollowings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFollowings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<GetUserFollowingsQuery, GetUserFollowingsQueryVariables>;
export const FollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mutation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userStatus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FImage"}}]}}]}}]} as unknown as DocumentNode<FollowingSubscription, FollowingSubscriptionVariables>;