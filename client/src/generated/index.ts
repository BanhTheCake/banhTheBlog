import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BaseUser = {
  __typename?: 'BaseUser';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  label: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CommonResponse = Response & {
  __typename?: 'CommonResponse';
  code: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginResponse = Response & {
  __typename?: 'LoginResponse';
  code: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activeAccount: CommonResponse;
  changePassword: CommonResponse;
  createCategory: CommonResponse;
  createNewPost: CommonResponse;
  deleteCategoryById: CommonResponse;
  deletePostById: CommonResponse;
  forgotPassword: CommonResponse;
  login: LoginResponse;
  logout: CommonResponse;
  register: RegisterResponse;
  updateCategoryById: CommonResponse;
  updateDataUser: CommonResponse;
  updateFavoriteUserPost: CommonResponse;
  updatePassword: CommonResponse;
  updatePostById: CommonResponse;
};


export type MutationActiveAccountArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  label: Scalars['String'];
  slug: Scalars['String'];
};


export type MutationCreateNewPostArgs = {
  categories: Array<Scalars['String']>;
  content: Scalars['String'];
  img: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCategoryByIdArgs = {
  _id: Scalars['String'];
};


export type MutationDeletePostByIdArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateCategoryByIdArgs = {
  _id: Scalars['String'];
  label: Scalars['String'];
  slug: Scalars['String'];
};


export type MutationUpdateDataUserArgs = {
  img?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateFavoriteUserPostArgs = {
  id: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdatePostByIdArgs = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  categories: Array<Category>;
  content: Scalars['String'];
  count: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  favoritesUser: Array<Scalars['String']>;
  img: Scalars['String'];
  slug: Scalars['String'];
  subContent: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: UserNoPassword;
};

export type PostsPagination = {
  __typename?: 'PostsPagination';
  PostPagination?: Maybe<Array<Post>>;
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPrevPage: Scalars['Boolean'];
  limit: Scalars['Int'];
  totalItem: Scalars['Int'];
  totalPage: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  accessToken: Scalars['String'];
  categories: Array<Category>;
  category?: Maybe<Category>;
  categoryHello: Scalars['String'];
  getAllCreatedPost: PostsPagination;
  getAllFavoritePost: PostsPagination;
  getBaseUser?: Maybe<BaseUser>;
  getDataUser?: Maybe<SafeUser>;
  hello: Scalars['String'];
  post: Post;
  postBySlug?: Maybe<Post>;
  postHello: Scalars['String'];
  posts?: Maybe<PostsPagination>;
  postsByCategoryId?: Maybe<PostsPagination>;
  postsBySearch?: Maybe<PostsPagination>;
  postsByUserId?: Maybe<PostsPagination>;
  refreshAccessToken: RefreshTokenResponse;
  refreshToken: Scalars['String'];
  relatedPosts: Array<Post>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryGetAllCreatedPostArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllFavoritePostArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBaseUserArgs = {
  userId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsByCategoryIdArgs = {
  categoryId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsBySearchArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search: SearchDto;
};


export type QueryPostsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryRelatedPostsArgs = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  currentId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type RefreshTokenResponse = Response & {
  __typename?: 'RefreshTokenResponse';
  code: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type RegisterResponse = Response & {
  __typename?: 'RegisterResponse';
  code: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Response = {
  code: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SafeUser = {
  __typename?: 'SafeUser';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstLogin: Scalars['Boolean'];
  img?: Maybe<Scalars['String']>;
  role: Roles;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type SearchDto = {
  categorySlug?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type UserNoPassword = {
  __typename?: 'UserNoPassword';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstLogin: Scalars['Boolean'];
  img?: Maybe<Scalars['String']>;
  role: Roles;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type ActiveAccountMutationVariables = Exact<{
  token: Scalars['String'];
  email: Scalars['String'];
}>;


export type ActiveAccountMutation = { __typename?: 'Mutation', activeAccount: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type CreateNewCategoryMutationVariables = Exact<{
  label: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateNewCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type CreateNewPostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  img: Scalars['String'];
  categories: Array<Scalars['String']> | Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', createNewPost: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategoryById: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePostById: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', updateFavoriteUserPost: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', code: number, ok: boolean, error?: string | null, msg?: string | null, token?: string | null } };

export type LogoutMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String'];
  label: Scalars['String'];
  slug: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategoryById: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePostById: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  img?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateDataUser: { __typename?: 'CommonResponse', code: number, ok: boolean, error?: string | null, msg?: string | null } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> };

export type GetFavoritesPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetFavoritesPostsQuery = { __typename?: 'Query', getAllFavoritePost: { __typename?: 'PostsPagination', limit: number, totalPage: number, currentPage: number, totalItem: number, hasNextPage: boolean, hasPrevPage: boolean, PostPagination?: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> | null } };

export type GetDataAuthorQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetDataAuthorQuery = { __typename?: 'Query', getBaseUser?: { __typename?: 'BaseUser', _id: string, username: string, email: string, img?: string | null, createdAt: any } | null };

export type GetDataUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataUserQuery = { __typename?: 'Query', getDataUser?: { __typename?: 'SafeUser', _id: string, username: string, email: string, img?: string | null, firstLogin: boolean, role: Roles, createdAt: any } | null };

export type GetDetailsPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetDetailsPostQuery = { __typename?: 'Query', postBySlug?: { __typename?: 'Post', _id: string, title: string, slug: string, content: string, img: string, count: number, favoritesUser: Array<string>, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> } | null };

export type GetMyPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetMyPostsQuery = { __typename?: 'Query', getAllCreatedPost: { __typename?: 'PostsPagination', limit: number, totalPage: number, currentPage: number, totalItem: number, hasNextPage: boolean, hasPrevPage: boolean, PostPagination?: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> | null } };

export type GetPostBySlugToUpdateQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostBySlugToUpdateQuery = { __typename?: 'Query', postBySlug?: { __typename?: 'Post', _id: string, title: string, content: string, img: string, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> } | null };

export type GetPostBySearchQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
  search: SearchDto;
}>;


export type GetPostBySearchQuery = { __typename?: 'Query', postsBySearch?: { __typename?: 'PostsPagination', limit: number, totalPage: number, currentPage: number, totalItem: number, hasNextPage: boolean, hasPrevPage: boolean, PostPagination?: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> | null } | null };

export type GetPostByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetPostByUserIdQuery = { __typename?: 'Query', postsByUserId?: { __typename?: 'PostsPagination', limit: number, totalPage: number, currentPage: number, totalItem: number, hasNextPage: boolean, hasPrevPage: boolean, PostPagination?: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> | null } | null };

export type GetRelatedPostsQueryVariables = Exact<{
  categories?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  limit: Scalars['Int'];
  currentId: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetRelatedPostsQuery = { __typename?: 'Query', relatedPosts: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> };

export type GetPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostsPagination', limit: number, totalPage: number, currentPage: number, totalItem: number, hasNextPage: boolean, hasPrevPage: boolean, PostPagination?: Array<{ __typename?: 'Post', _id: string, title: string, count: number, favoritesUser: Array<string>, subContent: string, img: string, slug: string, createdAt: any, user: { __typename?: 'UserNoPassword', _id: string, username: string, img?: string | null }, categories: Array<{ __typename?: 'Category', _id: string, label: string, slug: string }> }> | null } | null };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshAccessToken: { __typename?: 'RefreshTokenResponse', code: number, ok: boolean, error?: string | null, msg?: string | null, token?: string | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type VerifyRefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyRefreshTokenQuery = { __typename?: 'Query', refreshToken: string };


export const ActiveAccountDocument = `
    mutation activeAccount($token: String!, $email: String!) {
  activeAccount(token: $token, email: $email) {
    code
    ok
    error
    msg
  }
}
    `;
export const useActiveAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ActiveAccountMutation, TError, ActiveAccountMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ActiveAccountMutation, TError, ActiveAccountMutationVariables, TContext>(
      ['activeAccount'],
      (variables?: ActiveAccountMutationVariables) => fetcher<ActiveAccountMutation, ActiveAccountMutationVariables>(client, ActiveAccountDocument, variables, headers)(),
      options
    );
useActiveAccountMutation.fetcher = (client: GraphQLClient, variables: ActiveAccountMutationVariables, headers?: RequestInit['headers']) => fetcher<ActiveAccountMutation, ActiveAccountMutationVariables>(client, ActiveAccountDocument, variables, headers);
export const ChangePasswordDocument = `
    mutation changePassword($password: String!) {
  changePassword(password: $password) {
    code
    ok
    error
    msg
  }
}
    `;
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      ['changePassword'],
      (variables?: ChangePasswordMutationVariables) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers)(),
      options
    );
useChangePasswordMutation.fetcher = (client: GraphQLClient, variables: ChangePasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers);
export const CreateNewCategoryDocument = `
    mutation createNewCategory($label: String!, $slug: String!) {
  createCategory(label: $label, slug: $slug) {
    code
    ok
    error
    msg
  }
}
    `;
export const useCreateNewCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateNewCategoryMutation, TError, CreateNewCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateNewCategoryMutation, TError, CreateNewCategoryMutationVariables, TContext>(
      ['createNewCategory'],
      (variables?: CreateNewCategoryMutationVariables) => fetcher<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>(client, CreateNewCategoryDocument, variables, headers)(),
      options
    );
useCreateNewCategoryMutation.fetcher = (client: GraphQLClient, variables: CreateNewCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>(client, CreateNewCategoryDocument, variables, headers);
export const CreateNewPostDocument = `
    mutation createNewPost($title: String!, $content: String!, $img: String!, $categories: [String!]!, $slug: String!) {
  createNewPost(
    title: $title
    content: $content
    img: $img
    categories: $categories
    slug: $slug
  ) {
    code
    ok
    error
    msg
  }
}
    `;
export const useCreateNewPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateNewPostMutation, TError, CreateNewPostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateNewPostMutation, TError, CreateNewPostMutationVariables, TContext>(
      ['createNewPost'],
      (variables?: CreateNewPostMutationVariables) => fetcher<CreateNewPostMutation, CreateNewPostMutationVariables>(client, CreateNewPostDocument, variables, headers)(),
      options
    );
useCreateNewPostMutation.fetcher = (client: GraphQLClient, variables: CreateNewPostMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateNewPostMutation, CreateNewPostMutationVariables>(client, CreateNewPostDocument, variables, headers);
export const DeleteCategoryDocument = `
    mutation deleteCategory($id: String!) {
  deleteCategoryById(_id: $id) {
    code
    ok
    error
    msg
  }
}
    `;
export const useDeleteCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCategoryMutation, TError, DeleteCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCategoryMutation, TError, DeleteCategoryMutationVariables, TContext>(
      ['deleteCategory'],
      (variables?: DeleteCategoryMutationVariables) => fetcher<DeleteCategoryMutation, DeleteCategoryMutationVariables>(client, DeleteCategoryDocument, variables, headers)(),
      options
    );
useDeleteCategoryMutation.fetcher = (client: GraphQLClient, variables: DeleteCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCategoryMutation, DeleteCategoryMutationVariables>(client, DeleteCategoryDocument, variables, headers);
export const DeletePostDocument = `
    mutation deletePost($id: String!) {
  deletePostById(id: $id) {
    code
    ok
    error
    msg
  }
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['deletePost'],
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
useDeletePostMutation.fetcher = (client: GraphQLClient, variables: DeletePostMutationVariables, headers?: RequestInit['headers']) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers);
export const ForgotPasswordDocument = `
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    code
    ok
    error
    msg
  }
}
    `;
export const useForgotPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      ['forgotPassword'],
      (variables?: ForgotPasswordMutationVariables) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers)(),
      options
    );
useForgotPasswordMutation.fetcher = (client: GraphQLClient, variables: ForgotPasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers);
export const LikePostDocument = `
    mutation likePost($postId: String!) {
  updateFavoriteUserPost(id: $postId) {
    code
    ok
    error
    msg
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['likePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers)(),
      options
    );
useLikePostMutation.fetcher = (client: GraphQLClient, variables: LikePostMutationVariables, headers?: RequestInit['headers']) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers);
export const LoginDocument = `
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    code
    ok
    error
    msg
    token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
useLoginMutation.fetcher = (client: GraphQLClient, variables: LoginMutationVariables, headers?: RequestInit['headers']) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers);
export const LogoutDocument = `
    mutation logout($id: String!) {
  logout(id: $id) {
    code
    ok
    error
    msg
  }
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
useLogoutMutation.fetcher = (client: GraphQLClient, variables: LogoutMutationVariables, headers?: RequestInit['headers']) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers);
export const RegisterDocument = `
    mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    code
    ok
    error
    msg
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
useRegisterMutation.fetcher = (client: GraphQLClient, variables: RegisterMutationVariables, headers?: RequestInit['headers']) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers);
export const UpdateCategoryDocument = `
    mutation updateCategory($id: String!, $label: String!, $slug: String!) {
  updateCategoryById(_id: $id, label: $label, slug: $slug) {
    code
    ok
    error
    msg
  }
}
    `;
export const useUpdateCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCategoryMutation, TError, UpdateCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCategoryMutation, TError, UpdateCategoryMutationVariables, TContext>(
      ['updateCategory'],
      (variables?: UpdateCategoryMutationVariables) => fetcher<UpdateCategoryMutation, UpdateCategoryMutationVariables>(client, UpdateCategoryDocument, variables, headers)(),
      options
    );
useUpdateCategoryMutation.fetcher = (client: GraphQLClient, variables: UpdateCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateCategoryMutation, UpdateCategoryMutationVariables>(client, UpdateCategoryDocument, variables, headers);
export const UpdatePasswordDocument = `
    mutation UpdatePassword($password: String!, $newPassword: String!) {
  updatePassword(newPassword: $newPassword, password: $password) {
    code
    ok
    error
    msg
  }
}
    `;
export const useUpdatePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePasswordMutation, TError, UpdatePasswordMutationVariables, TContext>(
      ['UpdatePassword'],
      (variables?: UpdatePasswordMutationVariables) => fetcher<UpdatePasswordMutation, UpdatePasswordMutationVariables>(client, UpdatePasswordDocument, variables, headers)(),
      options
    );
useUpdatePasswordMutation.fetcher = (client: GraphQLClient, variables: UpdatePasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePasswordMutation, UpdatePasswordMutationVariables>(client, UpdatePasswordDocument, variables, headers);
export const UpdatePostDocument = `
    mutation updatePost($id: String!, $title: String, $content: String, $img: String, $categories: [String!]) {
  updatePostById(
    postId: $id
    title: $title
    content: $content
    img: $img
    categories: $categories
  ) {
    code
    ok
    error
    msg
  }
}
    `;
export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      ['updatePost'],
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
      options
    );
useUpdatePostMutation.fetcher = (client: GraphQLClient, variables: UpdatePostMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers);
export const UpdateUserDocument = `
    mutation updateUser($img: String, $username: String) {
  updateDataUser(img: $img, username: $username) {
    code
    ok
    error
    msg
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['updateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
useUpdateUserMutation.fetcher = (client: GraphQLClient, variables?: UpdateUserMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers);
export const AllCategoriesDocument = `
    query allCategories {
  categories {
    _id
    label
    slug
  }
}
    `;
export const useAllCategoriesQuery = <
      TData = AllCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllCategoriesQueryVariables,
      options?: UseQueryOptions<AllCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllCategoriesQuery, TError, TData>(
      variables === undefined ? ['allCategories'] : ['allCategories', variables],
      fetcher<AllCategoriesQuery, AllCategoriesQueryVariables>(client, AllCategoriesDocument, variables, headers),
      options
    );

useAllCategoriesQuery.getKey = (variables?: AllCategoriesQueryVariables) => variables === undefined ? ['allCategories'] : ['allCategories', variables];
;

useAllCategoriesQuery.fetcher = (client: GraphQLClient, variables?: AllCategoriesQueryVariables, headers?: RequestInit['headers']) => fetcher<AllCategoriesQuery, AllCategoriesQueryVariables>(client, AllCategoriesDocument, variables, headers);
export const GetFavoritesPostsDocument = `
    query getFavoritesPosts($limit: Int!, $page: Int!) {
  getAllFavoritePost(limit: $limit, page: $page) {
    limit
    totalPage
    currentPage
    totalItem
    hasNextPage
    hasPrevPage
    PostPagination {
      _id
      title
      count
      favoritesUser
      subContent
      img
      slug
      user {
        _id
        username
        img
      }
      categories {
        _id
        label
        slug
      }
      createdAt
    }
  }
}
    `;
export const useGetFavoritesPostsQuery = <
      TData = GetFavoritesPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetFavoritesPostsQueryVariables,
      options?: UseQueryOptions<GetFavoritesPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetFavoritesPostsQuery, TError, TData>(
      ['getFavoritesPosts', variables],
      fetcher<GetFavoritesPostsQuery, GetFavoritesPostsQueryVariables>(client, GetFavoritesPostsDocument, variables, headers),
      options
    );

useGetFavoritesPostsQuery.getKey = (variables: GetFavoritesPostsQueryVariables) => ['getFavoritesPosts', variables];
;

useGetFavoritesPostsQuery.fetcher = (client: GraphQLClient, variables: GetFavoritesPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetFavoritesPostsQuery, GetFavoritesPostsQueryVariables>(client, GetFavoritesPostsDocument, variables, headers);
export const GetDataAuthorDocument = `
    query getDataAuthor($userId: String!) {
  getBaseUser(userId: $userId) {
    _id
    username
    email
    img
    createdAt
  }
}
    `;
export const useGetDataAuthorQuery = <
      TData = GetDataAuthorQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDataAuthorQueryVariables,
      options?: UseQueryOptions<GetDataAuthorQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDataAuthorQuery, TError, TData>(
      ['getDataAuthor', variables],
      fetcher<GetDataAuthorQuery, GetDataAuthorQueryVariables>(client, GetDataAuthorDocument, variables, headers),
      options
    );

useGetDataAuthorQuery.getKey = (variables: GetDataAuthorQueryVariables) => ['getDataAuthor', variables];
;

useGetDataAuthorQuery.fetcher = (client: GraphQLClient, variables: GetDataAuthorQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDataAuthorQuery, GetDataAuthorQueryVariables>(client, GetDataAuthorDocument, variables, headers);
export const GetDataUserDocument = `
    query getDataUser {
  getDataUser {
    _id
    username
    email
    img
    firstLogin
    role
    createdAt
  }
}
    `;
export const useGetDataUserQuery = <
      TData = GetDataUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetDataUserQueryVariables,
      options?: UseQueryOptions<GetDataUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDataUserQuery, TError, TData>(
      variables === undefined ? ['getDataUser'] : ['getDataUser', variables],
      fetcher<GetDataUserQuery, GetDataUserQueryVariables>(client, GetDataUserDocument, variables, headers),
      options
    );

useGetDataUserQuery.getKey = (variables?: GetDataUserQueryVariables) => variables === undefined ? ['getDataUser'] : ['getDataUser', variables];
;

useGetDataUserQuery.fetcher = (client: GraphQLClient, variables?: GetDataUserQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDataUserQuery, GetDataUserQueryVariables>(client, GetDataUserDocument, variables, headers);
export const GetDetailsPostDocument = `
    query getDetailsPost($slug: String!) {
  postBySlug(slug: $slug) {
    _id
    title
    slug
    content
    img
    count
    favoritesUser
    createdAt
    user {
      _id
      username
      img
    }
    categories {
      _id
      label
      slug
    }
  }
}
    `;
export const useGetDetailsPostQuery = <
      TData = GetDetailsPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDetailsPostQueryVariables,
      options?: UseQueryOptions<GetDetailsPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDetailsPostQuery, TError, TData>(
      ['getDetailsPost', variables],
      fetcher<GetDetailsPostQuery, GetDetailsPostQueryVariables>(client, GetDetailsPostDocument, variables, headers),
      options
    );

useGetDetailsPostQuery.getKey = (variables: GetDetailsPostQueryVariables) => ['getDetailsPost', variables];
;

useGetDetailsPostQuery.fetcher = (client: GraphQLClient, variables: GetDetailsPostQueryVariables, headers?: RequestInit['headers']) => fetcher<GetDetailsPostQuery, GetDetailsPostQueryVariables>(client, GetDetailsPostDocument, variables, headers);
export const GetMyPostsDocument = `
    query getMyPosts($limit: Int!, $page: Int!) {
  getAllCreatedPost(limit: $limit, page: $page) {
    limit
    totalPage
    currentPage
    totalItem
    hasNextPage
    hasPrevPage
    PostPagination {
      _id
      title
      count
      favoritesUser
      subContent
      img
      slug
      user {
        _id
        username
        img
      }
      categories {
        _id
        label
        slug
      }
      createdAt
    }
  }
}
    `;
export const useGetMyPostsQuery = <
      TData = GetMyPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetMyPostsQueryVariables,
      options?: UseQueryOptions<GetMyPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMyPostsQuery, TError, TData>(
      ['getMyPosts', variables],
      fetcher<GetMyPostsQuery, GetMyPostsQueryVariables>(client, GetMyPostsDocument, variables, headers),
      options
    );

useGetMyPostsQuery.getKey = (variables: GetMyPostsQueryVariables) => ['getMyPosts', variables];
;

useGetMyPostsQuery.fetcher = (client: GraphQLClient, variables: GetMyPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetMyPostsQuery, GetMyPostsQueryVariables>(client, GetMyPostsDocument, variables, headers);
export const GetPostBySlugToUpdateDocument = `
    query getPostBySlugToUpdate($slug: String!) {
  postBySlug(slug: $slug) {
    _id
    title
    content
    img
    categories {
      _id
      label
      slug
    }
  }
}
    `;
export const useGetPostBySlugToUpdateQuery = <
      TData = GetPostBySlugToUpdateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostBySlugToUpdateQueryVariables,
      options?: UseQueryOptions<GetPostBySlugToUpdateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostBySlugToUpdateQuery, TError, TData>(
      ['getPostBySlugToUpdate', variables],
      fetcher<GetPostBySlugToUpdateQuery, GetPostBySlugToUpdateQueryVariables>(client, GetPostBySlugToUpdateDocument, variables, headers),
      options
    );

useGetPostBySlugToUpdateQuery.getKey = (variables: GetPostBySlugToUpdateQueryVariables) => ['getPostBySlugToUpdate', variables];
;

useGetPostBySlugToUpdateQuery.fetcher = (client: GraphQLClient, variables: GetPostBySlugToUpdateQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostBySlugToUpdateQuery, GetPostBySlugToUpdateQueryVariables>(client, GetPostBySlugToUpdateDocument, variables, headers);
export const GetPostBySearchDocument = `
    query getPostBySearch($limit: Int!, $page: Int!, $search: SearchDto!) {
  postsBySearch(limit: $limit, page: $page, search: $search) {
    limit
    totalPage
    currentPage
    totalItem
    hasNextPage
    hasPrevPage
    PostPagination {
      _id
      title
      count
      favoritesUser
      subContent
      img
      slug
      user {
        _id
        username
        img
      }
      categories {
        _id
        label
        slug
      }
      createdAt
    }
  }
}
    `;
export const useGetPostBySearchQuery = <
      TData = GetPostBySearchQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostBySearchQueryVariables,
      options?: UseQueryOptions<GetPostBySearchQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostBySearchQuery, TError, TData>(
      ['getPostBySearch', variables],
      fetcher<GetPostBySearchQuery, GetPostBySearchQueryVariables>(client, GetPostBySearchDocument, variables, headers),
      options
    );

useGetPostBySearchQuery.getKey = (variables: GetPostBySearchQueryVariables) => ['getPostBySearch', variables];
;

useGetPostBySearchQuery.fetcher = (client: GraphQLClient, variables: GetPostBySearchQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostBySearchQuery, GetPostBySearchQueryVariables>(client, GetPostBySearchDocument, variables, headers);
export const GetPostByUserIdDocument = `
    query getPostByUserId($userId: String!, $limit: Int!, $page: Int!) {
  postsByUserId(userId: $userId, limit: $limit, page: $page) {
    limit
    totalPage
    currentPage
    totalItem
    hasNextPage
    hasPrevPage
    PostPagination {
      _id
      title
      count
      favoritesUser
      subContent
      img
      slug
      user {
        _id
        username
        img
      }
      categories {
        _id
        label
        slug
      }
      createdAt
    }
  }
}
    `;
export const useGetPostByUserIdQuery = <
      TData = GetPostByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostByUserIdQueryVariables,
      options?: UseQueryOptions<GetPostByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostByUserIdQuery, TError, TData>(
      ['getPostByUserId', variables],
      fetcher<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>(client, GetPostByUserIdDocument, variables, headers),
      options
    );

useGetPostByUserIdQuery.getKey = (variables: GetPostByUserIdQueryVariables) => ['getPostByUserId', variables];
;

useGetPostByUserIdQuery.fetcher = (client: GraphQLClient, variables: GetPostByUserIdQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>(client, GetPostByUserIdDocument, variables, headers);
export const GetRelatedPostsDocument = `
    query getRelatedPosts($categories: [String!], $limit: Int!, $currentId: String!, $userId: String) {
  relatedPosts(
    categories: $categories
    limit: $limit
    currentId: $currentId
    userId: $userId
  ) {
    _id
    title
    count
    favoritesUser
    subContent
    img
    slug
    user {
      _id
      username
      img
    }
    categories {
      _id
      label
      slug
    }
    createdAt
  }
}
    `;
export const useGetRelatedPostsQuery = <
      TData = GetRelatedPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetRelatedPostsQueryVariables,
      options?: UseQueryOptions<GetRelatedPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRelatedPostsQuery, TError, TData>(
      ['getRelatedPosts', variables],
      fetcher<GetRelatedPostsQuery, GetRelatedPostsQueryVariables>(client, GetRelatedPostsDocument, variables, headers),
      options
    );

useGetRelatedPostsQuery.getKey = (variables: GetRelatedPostsQueryVariables) => ['getRelatedPosts', variables];
;

useGetRelatedPostsQuery.fetcher = (client: GraphQLClient, variables: GetRelatedPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetRelatedPostsQuery, GetRelatedPostsQueryVariables>(client, GetRelatedPostsDocument, variables, headers);
export const GetPostsDocument = `
    query getPosts($limit: Int!, $page: Int!) {
  posts(limit: $limit, page: $page) {
    limit
    totalPage
    currentPage
    totalItem
    hasNextPage
    hasPrevPage
    PostPagination {
      _id
      title
      count
      favoritesUser
      subContent
      img
      slug
      user {
        _id
        username
        img
      }
      categories {
        _id
        label
        slug
      }
      createdAt
    }
  }
}
    `;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      ['getPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    );

useGetPostsQuery.getKey = (variables: GetPostsQueryVariables) => ['getPosts', variables];
;

useGetPostsQuery.fetcher = (client: GraphQLClient, variables: GetPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers);
export const RefreshTokenDocument = `
    query refreshToken {
  refreshAccessToken {
    code
    ok
    error
    msg
    token
  }
}
    `;
export const useRefreshTokenQuery = <
      TData = RefreshTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RefreshTokenQueryVariables,
      options?: UseQueryOptions<RefreshTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RefreshTokenQuery, TError, TData>(
      variables === undefined ? ['refreshToken'] : ['refreshToken', variables],
      fetcher<RefreshTokenQuery, RefreshTokenQueryVariables>(client, RefreshTokenDocument, variables, headers),
      options
    );

useRefreshTokenQuery.getKey = (variables?: RefreshTokenQueryVariables) => variables === undefined ? ['refreshToken'] : ['refreshToken', variables];
;

useRefreshTokenQuery.fetcher = (client: GraphQLClient, variables?: RefreshTokenQueryVariables, headers?: RequestInit['headers']) => fetcher<RefreshTokenQuery, RefreshTokenQueryVariables>(client, RefreshTokenDocument, variables, headers);
export const HelloDocument = `
    query Hello {
  hello
}
    `;
export const useHelloQuery = <
      TData = HelloQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: HelloQueryVariables,
      options?: UseQueryOptions<HelloQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<HelloQuery, TError, TData>(
      variables === undefined ? ['Hello'] : ['Hello', variables],
      fetcher<HelloQuery, HelloQueryVariables>(client, HelloDocument, variables, headers),
      options
    );

useHelloQuery.getKey = (variables?: HelloQueryVariables) => variables === undefined ? ['Hello'] : ['Hello', variables];
;

useHelloQuery.fetcher = (client: GraphQLClient, variables?: HelloQueryVariables, headers?: RequestInit['headers']) => fetcher<HelloQuery, HelloQueryVariables>(client, HelloDocument, variables, headers);
export const VerifyRefreshTokenDocument = `
    query verifyRefreshToken {
  refreshToken
}
    `;
export const useVerifyRefreshTokenQuery = <
      TData = VerifyRefreshTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: VerifyRefreshTokenQueryVariables,
      options?: UseQueryOptions<VerifyRefreshTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VerifyRefreshTokenQuery, TError, TData>(
      variables === undefined ? ['verifyRefreshToken'] : ['verifyRefreshToken', variables],
      fetcher<VerifyRefreshTokenQuery, VerifyRefreshTokenQueryVariables>(client, VerifyRefreshTokenDocument, variables, headers),
      options
    );

useVerifyRefreshTokenQuery.getKey = (variables?: VerifyRefreshTokenQueryVariables) => variables === undefined ? ['verifyRefreshToken'] : ['verifyRefreshToken', variables];
;

useVerifyRefreshTokenQuery.fetcher = (client: GraphQLClient, variables?: VerifyRefreshTokenQueryVariables, headers?: RequestInit['headers']) => fetcher<VerifyRefreshTokenQuery, VerifyRefreshTokenQueryVariables>(client, VerifyRefreshTokenDocument, variables, headers);