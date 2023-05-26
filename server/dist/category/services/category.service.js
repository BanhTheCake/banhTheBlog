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
exports.CategoryService = void 0;
const post_service_1 = require("./../../post/services/post.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_entity_1 = require("../category.entity");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(CategoryModel, PostService) {
        this.CategoryModel = CategoryModel;
        this.PostService = PostService;
    }
    async getAllCategories() {
        const categories = await this.CategoryModel.find().exec();
        return categories;
    }
    async createCategory(data) {
        try {
            const existCategory = await this.CategoryModel.findOne({
                slug: data.slug,
            }).exec();
            if (existCategory) {
                return {
                    code: 400,
                    error: 'Category has been exist in our system !',
                    msg: null,
                    ok: false,
                };
            }
            await this.CategoryModel.create(Object.assign({}, data));
            return {
                code: 200,
                msg: 'Create category successful !',
                error: null,
                ok: true,
            };
        }
        catch (error) {
            return {
                code: 500,
                error: 'Something wrong with server !',
                msg: null,
                ok: false,
            };
        }
    }
    async updateCategoryById(data) {
        try {
            const duplicatedCategory = await this.CategoryModel.findOne({
                slug: data.slug,
                _id: {
                    $ne: data._id,
                },
            }).exec();
            if (duplicatedCategory) {
                return {
                    code: 400,
                    ok: false,
                    error: 'Category has been exist in our system !',
                    msg: null,
                };
            }
            const existCategory = await this.CategoryModel.findById(data._id).exec();
            if (!existCategory) {
                return {
                    code: 400,
                    ok: false,
                    error: 'Category is not exist in our system !',
                    msg: null,
                };
            }
            existCategory.label = data.label;
            existCategory.slug = data.slug;
            await existCategory.save();
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Update category successful !',
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async deleteCategoryById(id) {
        try {
            await this.CategoryModel.deleteOne({ _id: id }).exec();
            await this.PostService.removeAllById(id);
            return {
                code: 200,
                error: null,
                ok: true,
                msg: 'Delete category successful !',
            };
        }
        catch (error) {
            console.log('deleteCategory: ', error);
            return {
                code: 500,
                error: 'Something wrong with server !',
                msg: null,
                ok: false,
            };
        }
    }
    async findAll(categories) {
        const categoriesData = await this.CategoryModel.find({
            _id: categories,
        }).exec();
        return categoriesData;
    }
    async findById(categoryId) {
        const category = await this.CategoryModel.findById(categoryId).exec();
        return category;
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        post_service_1.PostService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map