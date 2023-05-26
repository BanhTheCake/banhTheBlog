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
import { PostService } from './../../post/services/post.service';
import { Category } from '../category.entity';
import { Model } from 'mongoose';
import { createCategoryDto } from '../dto/create.dto';
import { CommonResponse } from 'src/interfaces/common.interface';
import { UpdateCategoryDto } from '../dto/update.dto';
export declare class CategoryService {
    private CategoryModel;
    private PostService;
    constructor(CategoryModel: Model<Category>, PostService: PostService);
    getAllCategories(): Promise<Category[]>;
    createCategory(data: createCategoryDto): Promise<CommonResponse>;
    updateCategoryById(data: UpdateCategoryDto): Promise<CommonResponse>;
    deleteCategoryById(id: string): Promise<CommonResponse>;
    findAll(categories: string[]): Promise<Category[]>;
    findById(categoryId: string): Promise<import("mongoose").Document<unknown, {}, Category> & Omit<Category & Required<{
        _id: string;
    }>, never>>;
}
