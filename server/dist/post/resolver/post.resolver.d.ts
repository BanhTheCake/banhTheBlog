/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CategoryService } from './../../category/services/category.service';
import { PostService } from './../services/post.service';
import { User } from './../../user/user.entity';
import { Post } from '../post.entity';
import { CommonResponse } from 'src/interfaces/common.interface';
import { CreatePostDto } from '../dto/create.dto';
import { AccessTokenParams } from 'src/user/services/jwt.service';
import { UserService } from 'src/user/services/user.service';
import { Category } from 'src/category/category.entity';
import { UpdatePostDto } from '../dto/update.dto';
import { FavoritePostDto } from 'src/user/dto/favorite.dto';
import { PostsPagination } from '../interfaces/posts.pagination.i';
import { PostsPaginationDto } from '../dto/posts.pagination.dto';
import { CategoryPostPaginationDto } from '../dto/categoryPosts.pagination.dto';
import { SearchPostsPaginationDto } from '../dto/searchPosts.pagination';
import { RelatedPostsDto } from '../dto/RelatedPosts.dto';
import { UserPostsPaginationDto } from '../dto/userPosts.pagination';
export declare class PostResolver {
    private PostService;
    private UserService;
    private CategoryService;
    constructor(PostService: PostService, UserService: UserService, CategoryService: CategoryService);
    postHello(): string;
    posts(data: PostsPaginationDto): Promise<PostsPagination>;
    post(id: string): Promise<import("mongoose").Document<unknown, {}, Post> & Omit<Post & Required<{
        _id: string;
    }>, never>>;
    postBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, Post> & Omit<Post & Required<{
        _id: string;
    }>, never>>;
    postsByCategoryId({ categoryId, limit, page }: CategoryPostPaginationDto): Promise<PostsPagination>;
    postsBySearch({ search, limit, page }: SearchPostsPaginationDto): Promise<PostsPagination>;
    postsByUserId({ userId, limit, page }: UserPostsPaginationDto): Promise<PostsPagination>;
    relatedPosts(data: RelatedPostsDto): Promise<Post[]>;
    createNewPost(data: CreatePostDto, user: AccessTokenParams): Promise<CommonResponse>;
    user(post: Post): Promise<Omit<User, "password">>;
    categories(post: Post): Promise<Category[]>;
    updatePostById(data: UpdatePostDto): Promise<CommonResponse>;
    updateFavoriteUserPost(data: FavoritePostDto, user: AccessTokenParams): Promise<CommonResponse>;
    deletePostById(id: string): Promise<CommonResponse>;
}
