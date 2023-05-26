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
exports.CategoryResolver = void 0;
const post_service_1 = require("./../../post/services/post.service");
const graphql_1 = require("@nestjs/graphql");
const category_entity_1 = require("../category.entity");
const category_service_1 = require("../services/category.service");
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("../../user/guards/accessToken.guard");
const common_interface_1 = require("../../interfaces/common.interface");
const create_dto_1 = require("../dto/create.dto");
const roles_decorator_1 = require("../../user/decorators/roles.decorator");
const roles_enum_1 = require("../../enums/roles.enum");
const roles_guard_1 = require("../../user/guards/roles.guard");
const update_dto_1 = require("../dto/update.dto");
let CategoryResolver = class CategoryResolver {
    constructor(CategoryService, PostService) {
        this.CategoryService = CategoryService;
        this.PostService = PostService;
    }
    categoryHello() {
        return 'hello from category resolver ';
    }
    category(id) {
        return this.CategoryService.findById(id);
    }
    categories() {
        return this.CategoryService.getAllCategories();
    }
    createCategory(data) {
        return this.CategoryService.createCategory(data);
    }
    updateCategoryById(data) {
        return this.CategoryService.updateCategoryById(data);
    }
    deleteCategoryById(id) {
        return this.CategoryService.deleteCategoryById(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "categoryHello", null);
__decorate([
    (0, graphql_1.Query)(() => category_entity_1.Category, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, graphql_1.Query)(() => [category_entity_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.createCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "updateCategoryById", null);
__decorate([
    (0, roles_decorator_1.RolesApplied)(roles_enum_1.Roles.ADMIN),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, graphql_1.Mutation)(() => common_interface_1.CommonResponse),
    __param(0, (0, graphql_1.Args)('_id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "deleteCategoryById", null);
CategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => category_entity_1.Category),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        post_service_1.PostService])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.resolver.js.map