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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const category_service_1 = require("./../../category/services/category.service");
const post_service_1 = require("./../services/post.service");
const graphql_1 = require("@nestjs/graphql");
const post_entity_1 = require("../post.entity");
const common_interface_1 = require("../../interfaces/common.interface");
const create_dto_1 = require("../dto/create.dto");
const roles_enum_1 = require("../../enums/roles.enum");
const roles_decorator_1 = require("../../user/decorators/roles.decorator");
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("../../user/guards/accessToken.guard");
const roles_guard_1 = require("../../user/guards/roles.guard");
const user_decorator_1 = require("../../user/decorators/user.decorator");
const user_service_1 = require("../../user/services/user.service");
const userNoPassword_interface_1 = require("../../user/interfaces/userNoPassword.interface");
const category_entity_1 = require("../../category/category.entity");
const update_dto_1 = require("../dto/update.dto");
const favorite_dto_1 = require("../../user/dto/favorite.dto");
const common_2 = require("@nestjs/common");
const posts_pagination_i_1 = require("../interfaces/posts.pagination.i");
const posts_pagination_dto_1 = require("../dto/posts.pagination.dto");
const categoryPosts_pagination_dto_1 = require("../dto/categoryPosts.pagination.dto");
const searchPosts_pagination_1 = require("../dto/searchPosts.pagination");
const RelatedPosts_dto_1 = require("../dto/RelatedPosts.dto");
const userPosts_pagination_1 = require("../dto/userPosts.pagination");
let PostResolver = class PostResolver {
    constructor(PostService, UserService, CategoryService) {
        this.PostService = PostService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
    }
    postHello() {
        return 'Hello from post !';
    }
    posts(data) {
        return this.PostService.getAllPosts(data);
    }
    post(id) {
        return this.PostService.findPostById(id);
    }
    postBySlug(slug) {
        return this.PostService.findPostBySlug(slug);
    }
    postsByCategoryId({ categoryId, limit, page }) {
        return this.PostService.findAllPostByCategoryId(categoryId, {
            limit,
            page,
        });
    }
    postsBySearch({ search, limit, page }) {
        return this.PostService.findAllPostBySearch(search, {
            limit,
            page,
        });
    }
    postsByUserId({ userId, limit, page }) {
        return this.PostService.findAllPostByUserId(userId, {
            limit,
            page,
        });
    }
    relatedPosts(data) {
        return this.PostService.findRelatedPost(data);
    }
    createNewPost(data, user) {
        return this.PostService.createNewPost(data, user.userId);
    }
    user(post) {
        return this.UserService.findById(post.user);
    }
    categories(post) {
        return this.CategoryService.findAll(post.categories);
    }
    updatePostById(data) {
        return this.PostService.updateById(data);
    }
    updateFavoriteUserPost(data, user) {
        return this.PostService.updateFavoriteUser(data, user.userId);
    }
    deletePostById(id) {
        return this.PostService.deleteById(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "postHello", null);
__decorate([
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination, { nullable: true, defaultValue: [] }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_pagination_dto_1.PostsPaginationDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.Post),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.Post, { nullable: true }),
    __param(0, (0, graphql_1.Args)('slug', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "postBySlug", null);
__decorate([
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination, { nullable: true, defaultValue: [] }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categoryPosts_pagination_dto_1.CategoryPostPaginationDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "postsByCategoryId", null);
__decorate([
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination, { nullable: true, defaultValue: [] }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchPosts_pagination_1.SearchPostsPaginationDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "postsBySearch", null);
__decorate([
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination, { nullable: true, defaultValue: [] }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userPosts_pagination_1.UserPostsPaginationDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "postsByUserId", null);
__decorate([
    (0, graphql_1.Query)(() => [post_entity_1.Post]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RelatedPosts_dto_1.RelatedPostsDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "relatedPosts", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "createNewPost", null);
__decorate([
    (0, graphql_1.ResolveField)(() => userNoPassword_interface_1.UserNoPassword),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [category_entity_1.Category]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "categories", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "updatePostById", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.USER, roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.FavoritePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "updateFavoriteUserPost", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "deletePostById", null);
PostResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_entity_1.Post),
    __param(1, (0, common_2.Inject)((0, common_2.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_2.Inject)((0, common_2.forwardRef)(() => category_service_1.CategoryService))),
    __metadata("design:paramtypes", [post_service_1.PostService,
        user_service_1.UserService,
        category_service_1.CategoryService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map