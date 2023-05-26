"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("../post.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const html_to_text_1 = require("html-to-text");
const socket_gateway_1 = require("../../socket/socket.gateway");
const like_enum_1 = require("../enums/like.enum");
let PostService = class PostService {
    constructor(PostModel, SocketGateway) {
        this.PostModel = PostModel;
        this.SocketGateway = SocketGateway;
    }
    async getAllPosts({ limit, page, }) {
        const limitModify = limit > 0 ? limit : 4;
        const pageModify = page > 0 ? page : 1;
        const offset = (pageModify - 1) * limitModify;
        const countPosts = await this.PostModel.count().exec();
        const posts = await this.PostModel.find()
            .skip(offset)
            .limit(limitModify)
            .exec();
        const currentPage = pageModify;
        const totalPage = Math.ceil(countPosts / limitModify);
        const hasNextPage = currentPage < totalPage;
        const hasPrevPage = currentPage > 1;
        return {
            hasNextPage,
            hasPrevPage,
            currentPage,
            limit: limitModify,
            PostPagination: posts,
            totalItem: countPosts,
            totalPage,
        };
    }
    async createNewPost(data, userId) {
        try {
            const subContent = (0, html_to_text_1.convert)(data.content, {
                selectors: [
                    { selector: 'a', options: { noAnchorUrl: true, ignoreHref: true } },
                    {
                        selector: 'img',
                        format: 'skip',
                    },
                ],
            }).slice(0, 100);
            await this.PostModel.create(Object.assign(Object.assign({}, data), { subContent, user: userId }));
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Create post successful !',
            };
        }
        catch (error) {
            console.log('Create new Post: ', error);
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async updateById(data) {
        try {
            const { postId } = data, value = __rest(data, ["postId"]);
            const existPost = await this.PostModel.findOne({ _id: postId }).exec();
            if (!existPost) {
                return {
                    code: 400,
                    ok: false,
                    error: 'PostId is not exist in our system !',
                    msg: null,
                };
            }
            const updateInput = Object.assign({}, value);
            if (data === null || data === void 0 ? void 0 : data.content) {
                updateInput.subContent = (0, html_to_text_1.convert)(data.content, {
                    selectors: [
                        { selector: 'a', options: { noAnchorUrl: true, ignoreHref: true } },
                        {
                            selector: 'img',
                            format: 'skip',
                        },
                    ],
                }).slice(0, 100);
            }
            const updatePost = await this.PostModel.updateOne({ _id: postId }, updateInput).exec();
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Update post successful !',
            };
        }
        catch (error) {
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async findPostById(id) {
        const post = await this.PostModel.findById(id).exec();
        return post;
    }
    async findPostBySlug(slug) {
        const post = await this.PostModel.findOne({ slug }).exec();
        return post;
    }
    async updateFavoriteUser(data, userId) {
        try {
            const existPost = await this.PostModel.findById(data.id).exec();
            if (!existPost) {
                return {
                    code: 400,
                    error: 'Post is not exist in our system !',
                    ok: false,
                    msg: null,
                };
            }
            const isInFavoritePost = Boolean(await this.PostModel.findOne({
                _id: data.id,
                favoritesUser: userId,
            }).exec());
            if (isInFavoritePost) {
                await this.PostModel.updateOne({
                    _id: data.id,
                }, {
                    $pull: { favoritesUser: userId },
                    $set: {
                        count: existPost.favoritesUser.length - 1 > 0
                            ? existPost.favoritesUser.length - 1
                            : 0,
                    },
                }).exec();
                this.SocketGateway.server.emit(`posts:${data.id}:likes`, {
                    type: like_enum_1.default.REMOVE,
                    data: {
                        postId: data.id,
                        userId: userId,
                    },
                });
                return {
                    code: 200,
                    error: null,
                    ok: true,
                    msg: 'Remove favorite userId successful !',
                };
            }
            await this.PostModel.updateOne({
                _id: data.id,
            }, {
                $push: { favoritesUser: userId },
                $set: {
                    count: existPost.favoritesUser.length + 1,
                },
            }).exec();
            this.SocketGateway.server.emit(`posts:${data.id}:likes`, {
                type: like_enum_1.default.UPDATE,
                data: {
                    postId: data.id,
                    userId: userId,
                },
            });
            return {
                code: 200,
                error: null,
                ok: true,
                msg: 'Add favorite userId successful !',
            };
        }
        catch (error) {
            return {
                code: 500,
                error: 'Something wrong with server !',
                ok: false,
                msg: null,
            };
        }
    }
    async findAllPostByUserId(userId, { limit, page }) {
        const limitModify = limit > 0 ? limit : 4;
        const pageModify = page > 0 ? page : 1;
        const offset = (pageModify - 1) * limitModify;
        const countPosts = await this.PostModel.count({ user: userId }).exec();
        const posts = await this.PostModel.find({ user: userId })
            .skip(offset)
            .limit(limitModify)
            .exec();
        const totalPage = Math.ceil(countPosts / limitModify);
        const hasNextPage = pageModify < totalPage;
        const hasPrevPage = pageModify > 1;
        return {
            currentPage: pageModify,
            hasNextPage,
            hasPrevPage,
            limit: limitModify,
            totalItem: countPosts,
            totalPage,
            PostPagination: posts,
        };
    }
    async findAllFavoritePostByUserId(userId, { limit, page }) {
        const limitModify = limit > 0 ? limit : 4;
        const pageModify = page > 0 ? page : 1;
        const offset = (pageModify - 1) * limitModify;
        const countPosts = await this.PostModel.count({
            favoritesUser: userId,
        }).exec();
        const posts = await this.PostModel.find({ favoritesUser: userId })
            .skip(offset)
            .limit(limitModify)
            .exec();
        const totalPage = Math.ceil(countPosts / limitModify);
        const hasNextPage = pageModify < totalPage;
        const hasPrevPage = pageModify > 1;
        return {
            currentPage: pageModify,
            hasNextPage,
            hasPrevPage,
            limit: limitModify,
            totalItem: countPosts,
            totalPage,
            PostPagination: posts,
        };
    }
    async findAllPostByCategoryId(categoryId, { limit, page }) {
        const limitModify = limit > 0 ? limit : 4;
        const pageModify = page > 0 ? page : 1;
        const offset = (pageModify - 1) * limitModify;
        const countPosts = await this.PostModel.count({
            categories: categoryId,
        }).exec();
        const posts = await this.PostModel.find({ categories: categoryId })
            .skip(offset)
            .limit(limitModify)
            .exec();
        const totalPage = Math.ceil(countPosts / limitModify);
        const hasNextPage = pageModify < totalPage;
        const hasPrevPage = pageModify > 1;
        return {
            currentPage: pageModify,
            hasNextPage,
            hasPrevPage,
            limit: limitModify,
            PostPagination: posts,
            totalItem: posts.length,
            totalPage: totalPage,
        };
    }
    async findAllPostBySearch(search, { limit, page }) {
        try {
            const limitModify = limit > 0 ? limit : 4;
            const pageModify = page > 0 ? page : 1;
            const offset = (pageModify - 1) * limitModify;
            const { categorySlug, query } = search;
            let whereOptions = {};
            if (categorySlug && categorySlug !== 'all') {
                whereOptions = Object.assign(Object.assign({}, whereOptions), { 'categories.slug': categorySlug });
            }
            if (query) {
                whereOptions = Object.assign(Object.assign({}, whereOptions), { $or: [
                        {
                            title: { $regex: query, $options: 'i' },
                        },
                        {
                            content: { $regex: query, $options: 'i' },
                        },
                    ] });
            }
            const [{ countPosts }] = (await this.PostModel.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categories',
                        foreignField: '_id',
                        as: 'categories',
                    },
                },
                {
                    $match: whereOptions,
                },
                {
                    $count: 'countPosts',
                },
            ]).exec());
            const posts = await this.PostModel.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categories',
                        foreignField: '_id',
                        as: 'categories',
                    },
                },
                {
                    $match: whereOptions,
                },
            ])
                .skip(offset)
                .limit(limitModify)
                .exec();
            const totalPage = Math.ceil(countPosts / limitModify);
            const hasNextPage = pageModify < totalPage;
            const hasPrevPage = pageModify > 1;
            return {
                currentPage: pageModify,
                hasNextPage,
                hasPrevPage,
                limit: limitModify,
                PostPagination: posts,
                totalItem: posts.length,
                totalPage: totalPage,
            };
        }
        catch (error) {
            return {
                currentPage: page,
                hasNextPage: false,
                hasPrevPage: false,
                limit: limit,
                PostPagination: null,
                totalItem: 0,
                totalPage: 0,
            };
        }
    }
    async findRelatedPost({ categories, userId, currentId, limit, }) {
        const limitModify = limit > 0 ? limit : 4;
        let whereCondition = {
            _id: { $ne: currentId },
        };
        if (categories) {
            whereCondition = Object.assign({ categories: { $in: categories } }, whereCondition);
        }
        if (userId) {
            whereCondition = Object.assign({ user: userId }, whereCondition);
        }
        const posts = await this.PostModel.find(whereCondition)
            .limit(limitModify)
            .exec();
        return posts;
    }
    async removeAllById(id) {
        try {
            console.log(id);
            await this.PostModel.updateMany({ categories: id }, {
                $pull: {
                    categories: id,
                },
            }).exec();
        }
        catch (error) {
            throw error;
        }
    }
    async deleteById(id) {
        try {
            const existPost = await this.PostModel.findById(id).exec();
            if (!existPost) {
                return {
                    code: 400,
                    error: 'Post is not exist in our system',
                    msg: null,
                    ok: false,
                };
            }
            await this.PostModel.deleteOne({ _id: id }).exec();
            return {
                code: 200,
                error: null,
                msg: 'Delete post success',
                ok: true,
            };
        }
        catch (error) {
            return {
                code: 500,
                error: 'Something wrong with server',
                msg: null,
                ok: false,
            };
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        socket_gateway_1.SocketGateway])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map