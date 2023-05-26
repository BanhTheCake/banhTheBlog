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
exports.UserResolver = void 0;
const user_interface_1 = require("./../interfaces/user.interface");
const posts_pagination_i_1 = require("./../../post/interfaces/posts.pagination.i");
const post_service_1 = require("./../../post/services/post.service");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../user.entity");
const register_interface_1 = require("../interfaces/register.interface");
const register_dto_1 = require("../dto/register.dto");
const user_service_1 = require("../services/user.service");
const login_dto_1 = require("../dto/login.dto");
const login_interface_1 = require("../interfaces/login.interface");
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("../guards/accessToken.guard");
const refreshToken_guard_1 = require("../guards/refreshToken.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const update_dto_1 = require("../dto/update.dto");
const password_dto_1 = require("../dto/password.dto");
const active_dto_1 = require("../dto/active.dto");
const forgotToken_guard_1 = require("../guards/forgotToken.guard");
const forgot_dto_1 = require("../dto/forgot.dto");
const common_interface_1 = require("../../interfaces/common.interface");
const common_2 = require("@nestjs/common");
const posts_pagination_dto_1 = require("../../post/dto/posts.pagination.dto");
const refreshToken_interface_1 = require("../interfaces/refreshToken.interface");
let UserResolver = class UserResolver {
    constructor(UserService, PostService) {
        this.UserService = UserService;
        this.PostService = PostService;
    }
    async hello() {
        return 'Hello World';
    }
    getBaseUser(userId) {
        return this.UserService.getBaseUser(userId);
    }
    getDataUser(user) {
        return this.UserService.getDataUser(user.userId);
    }
    getAllCreatedPost(data, user) {
        return this.PostService.findAllPostByUserId(user.userId, data);
    }
    getAllFavoritePost(data, user) {
        return this.PostService.findAllFavoritePostByUserId(user.userId, data);
    }
    register(data) {
        return this.UserService.register(data);
    }
    activeAccount(data) {
        return this.UserService.activeAccount(data);
    }
    forgotPassword(email) {
        return this.UserService.forgotPassword(email);
    }
    changePassword(data, user) {
        return this.UserService.changePassword(data.password, user.userId);
    }
    login(data, context) {
        return this.UserService.login(data, context.res);
    }
    logout(id, context) {
        return this.UserService.logout(id, context.res);
    }
    updateDataUser(dataUpdate, user) {
        return this.UserService.updateData(dataUpdate, user.userId);
    }
    updatePassword(data, user, context) {
        return this.UserService.updatePassword(data, user.userId, context.res);
    }
    refreshAccessToken(user, context) {
        return this.UserService.refreshAccessToken(user.userId, context.res);
    }
    accessToken(user) {
        return 'Allow to access accessToken';
    }
    refreshToken(user) {
        return 'Allow to access refreshToken';
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Query)(() => user_interface_1.BaseUser, { nullable: true }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getBaseUser", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, graphql_1.Query)(() => user_interface_1.SafeUser, { nullable: true }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getDataUser", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_pagination_dto_1.PostsPaginationDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getAllCreatedPost", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, graphql_1.Query)(() => posts_pagination_i_1.PostsPagination),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_pagination_dto_1.PostsPaginationDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getAllFavoritePost", null);
__decorate([
    (0, graphql_1.Mutation)(() => register_interface_1.RegisterResponse),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [active_dto_1.ActiveDto]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "activeAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)('email', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.UseGuards)(forgotToken_guard_1.ForgotTokenGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_dto_1.ForgotDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "changePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_interface_1.LoginResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateDto, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateDataUser", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_dto_1.PasswordDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, graphql_1.Query)(() => refreshToken_interface_1.RefreshTokenResponse),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, graphql_1.Query)(() => String),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "accessToken", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, graphql_1.Query)(() => String),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "refreshToken", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __param(1, (0, common_2.Inject)((0, common_2.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        post_service_1.PostService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map