import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  File: any;
};

export enum AuthorStatus {
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  posts: Array<Post>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  commenter: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  parentComment?: Maybe<Comment>;
  replies: Array<Comment>;
  updatedAt: Scalars['String'];
};

export type CreateCommentInput = {
  content: Scalars['String'];
  parentComment?: InputMaybe<Scalars['ID']>;
  postId: Scalars['ID'];
};

export type CreatePostInput = {
  categories: Array<Scalars['String']>;
  content: Scalars['String'];
  image: Scalars['File'];
  published: Scalars['Boolean'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export enum EReactionsMutationStatus {
  React = 'REACT',
  Withdraw = 'WITHDRAW'
}

export enum FollowingMutationStatus {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export type LoginInput = {
  emailOrMobile: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createComment: Comment;
  createPost: Post;
  deleteCategory: Scalars['ID'];
  deleteComment: Scalars['ID'];
  deletePost: Scalars['ID'];
  followRequest: UserFollow;
  login: Tokens;
  reactionToPost: UserFollow;
  register: Scalars['ID'];
  resendActivation: Scalars['ID'];
  token: Tokens;
  unFollowRequest: Scalars['ID'];
  updateCategory: Category;
  updateComment: Comment;
  updatePost: Post;
  uploadAvatar: Picture;
  uploadFile: Scalars['String'];
  verifyUser: Scalars['ID'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  data?: InputMaybe<CreateCommentInput>;
};


export type MutationCreatePostArgs = {
  data?: InputMaybe<CreatePostInput>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationFollowRequestArgs = {
  toId: Scalars['ID'];
};


export type MutationLoginArgs = {
  data?: InputMaybe<LoginInput>;
};


export type MutationReactionToPostArgs = {
  toId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  data?: InputMaybe<RegisterInput>;
};


export type MutationResendActivationArgs = {
  userId: Scalars['ID'];
};


export type MutationTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationUnFollowRequestArgs = {
  toId: Scalars['ID'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  data?: InputMaybe<UpdateCommentInput>;
};


export type MutationUpdatePostArgs = {
  data?: InputMaybe<UpdatePostInput>;
};


export type MutationUploadAvatarArgs = {
  avatar: Scalars['File'];
};


export type MutationUploadFileArgs = {
  file: Scalars['File'];
};


export type MutationVerifyUserArgs = {
  code: Scalars['String'];
  userId: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginateComments = {
  __typename?: 'PaginateComments';
  data: Array<Comment>;
  pageInfo?: Maybe<PageInfo>;
  total: Scalars['Int'];
};

export type PaginatePosts = {
  __typename?: 'PaginatePosts';
  data: Array<Post>;
  pageInfo?: Maybe<PageInfo>;
  total: Scalars['Int'];
};

export type Picture = {
  __typename?: 'Picture';
  createdAt: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  categories: Array<Category>;
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image: Picture;
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['String']>;
  reactionsBy: Array<User>;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  comments: PaginateComments;
  post: Post;
  posts: PaginatePosts;
  tagPosts: PaginatePosts;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  postId: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  role: Scalars['String'];
};


export type QueryTagPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  role: Scalars['String'];
  tag: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  mobile: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  role: Scalars['String'];
};

export enum RegisterUserRole {
  Author = 'AUTHOR',
  User = 'USER'
}

export type SubFollowedBy = {
  __typename?: 'SubFollowedBY';
  followedBy: UserFollow;
  mutation: FollowingMutationStatus;
};

export type SubReaction = {
  __typename?: 'SubReaction';
  mutation: EReactionsMutationStatus;
  reactBy: UserFollow;
};

export type SubUserStatus = {
  __typename?: 'SubUserStatus';
  mutation: UserMutationStatus;
  userId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  following: SubFollowedBy;
  reactions: SubReaction;
  userVerify: SubUserStatus;
};


export type SubscriptionReactionsArgs = {
  postId: Scalars['ID'];
};


export type SubscriptionUserVerifyArgs = {
  userId: Scalars['ID'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  posts: Array<Post>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateCommentInput = {
  commentId: Scalars['ID'];
  content: Scalars['String'];
};

export type UpdatePostInput = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['File']>;
  published?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  authorStatus?: Maybe<AuthorStatus>;
  avatar?: Maybe<Picture>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers: Array<UserFollow>;
  followings: Array<UserFollow>;
  id: Scalars['ID'];
  mobile: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  role: UserRole;
  updatedAt: Scalars['String'];
};

export type UserFollow = {
  __typename?: 'UserFollow';
  avatar?: Maybe<Picture>;
  email: Scalars['String'];
  id: Scalars['ID'];
  mobile: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export enum UserMutationStatus {
  Verified = 'VERIFIED'
}

export enum UserRole {
  Admin = 'ADMIN',
  Author = 'AUTHOR',
  User = 'USER'
}

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  mobile: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type UserVerificationMutationVariables = Exact<{
  userId: Scalars['ID'];
  code: Scalars['String'];
}>;


export type UserVerificationMutation = { __typename?: 'Mutation', verifyUser: string };

export type ResendActivationLinkMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ResendActivationLinkMutation = { __typename?: 'Mutation', resendActivation: string };

export type VerifyUserSubscriptionVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type VerifyUserSubscription = { __typename?: 'Subscription', userVerify: { __typename?: 'SubUserStatus', userId: string, mutation: UserMutationStatus } };


export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!, $confirmPassword: String!, $mobile: String!) {
  register(
    data: {name: $name, email: $email, role: "AUTHOR", password: $password, confirmPassword: $confirmPassword, mobile: $mobile}
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *      mobile: // value for 'mobile'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserVerificationDocument = gql`
    mutation UserVerification($userId: ID!, $code: String!) {
  verifyUser(userId: $userId, code: $code)
}
    `;
export type UserVerificationMutationFn = Apollo.MutationFunction<UserVerificationMutation, UserVerificationMutationVariables>;

/**
 * __useUserVerificationMutation__
 *
 * To run a mutation, you first call `useUserVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userVerificationMutation, { data, loading, error }] = useUserVerificationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUserVerificationMutation(baseOptions?: Apollo.MutationHookOptions<UserVerificationMutation, UserVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserVerificationMutation, UserVerificationMutationVariables>(UserVerificationDocument, options);
      }
export type UserVerificationMutationHookResult = ReturnType<typeof useUserVerificationMutation>;
export type UserVerificationMutationResult = Apollo.MutationResult<UserVerificationMutation>;
export type UserVerificationMutationOptions = Apollo.BaseMutationOptions<UserVerificationMutation, UserVerificationMutationVariables>;
export const ResendActivationLinkDocument = gql`
    mutation ResendActivationLink($userId: ID!) {
  resendActivation(userId: $userId)
}
    `;
export type ResendActivationLinkMutationFn = Apollo.MutationFunction<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>;

/**
 * __useResendActivationLinkMutation__
 *
 * To run a mutation, you first call `useResendActivationLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendActivationLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendActivationLinkMutation, { data, loading, error }] = useResendActivationLinkMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useResendActivationLinkMutation(baseOptions?: Apollo.MutationHookOptions<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>(ResendActivationLinkDocument, options);
      }
export type ResendActivationLinkMutationHookResult = ReturnType<typeof useResendActivationLinkMutation>;
export type ResendActivationLinkMutationResult = Apollo.MutationResult<ResendActivationLinkMutation>;
export type ResendActivationLinkMutationOptions = Apollo.BaseMutationOptions<ResendActivationLinkMutation, ResendActivationLinkMutationVariables>;
export const VerifyUserDocument = gql`
    subscription VerifyUser($userId: ID!) {
  userVerify(userId: $userId) {
    userId
    mutation
  }
}
    `;

/**
 * __useVerifyUserSubscription__
 *
 * To run a query within a React component, call `useVerifyUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyUserSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useVerifyUserSubscription(baseOptions: Apollo.SubscriptionHookOptions<VerifyUserSubscription, VerifyUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VerifyUserSubscription, VerifyUserSubscriptionVariables>(VerifyUserDocument, options);
      }
export type VerifyUserSubscriptionHookResult = ReturnType<typeof useVerifyUserSubscription>;
export type VerifyUserSubscriptionResult = Apollo.SubscriptionResult<VerifyUserSubscription>;