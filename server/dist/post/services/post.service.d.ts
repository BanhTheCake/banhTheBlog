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
/// <reference types="mongoose/types/inferschematype" />
import { Post } from '../post.entity';
import { Model } from 'mongoose';
import { CommonResponse } from 'src/interfaces/common.interface';
import { CreatePostDto } from '../dto/create.dto';
import { UpdatePostDto } from '../dto/update.dto';
import { FavoritePostDto } from 'src/user/dto/favorite.dto';
import { PostsPaginationDto } from '../dto/posts.pagination.dto';
import { PostsPagination } from '../interfaces/posts.pagination.i';
import { SearchDto } from '../dto/searchPosts.pagination';
import { RelatedPostsDto } from '../dto/RelatedPosts.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
export declare class PostService {
    private PostModel;
    private SocketGateway;
    constructor(PostModel: Model<Post>, SocketGateway: SocketGateway);
    getAllPosts({ limit, page, }: PostsPaginationDto): Promise<PostsPagination>;
    createNewPost(data: CreatePostDto, userId: string): Promise<CommonResponse>;
    updateById(data: UpdatePostDto): Promise<CommonResponse>;
    findPostById(id: string): Promise<import("mongoose").Document<unknown, {}, Post> & Omit<Post & Required<{
        _id: string;
    }>, never>>;
    findPostBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, Post> & Omit<Post & Required<{
        _id: string;
    }>, never>>;
    updateFavoriteUser(data: FavoritePostDto, userId: string): Promise<CommonResponse>;
    findAllPostByUserId(userId: string, { limit, page }: PostsPaginationDto): Promise<PostsPagination>;
    findAllFavoritePostByUserId(userId: string, { limit, page }: PostsPaginationDto): Promise<PostsPagination>;
    findAllPostByCategoryId(categoryId: string, { limit, page }: PostsPaginationDto): Promise<PostsPagination>;
    findAllPostBySearch(search: SearchDto, { limit, page }: PostsPaginationDto): Promise<PostsPagination>;
    findRelatedPost({ categories, userId, currentId, limit, }: RelatedPostsDto): Promise<Post[]>;
    removeAllById(id: string): Promise<void>;
    deleteById(id: string): Promise<CommonResponse>;
}
