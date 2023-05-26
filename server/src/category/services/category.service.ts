import { PostService } from './../../post/services/post.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../category.entity';
import { Model } from 'mongoose';
import { createCategoryDto } from '../dto/create.dto';
import { CommonResponse } from 'src/interfaces/common.interface';
import { UpdateCategoryDto } from '../dto/update.dto';
import { Post } from 'src/post/post.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
    @Inject(forwardRef(() => PostService))
    private PostService: PostService,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.CategoryModel.find().exec();
    return categories;
  }

  async createCategory(data: createCategoryDto): Promise<CommonResponse> {
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

      await this.CategoryModel.create({
        ...data,
      });
      return {
        code: 200,
        msg: 'Create category successful !',
        error: null,
        ok: true,
      };
    } catch (error) {
      return {
        code: 500,
        error: 'Something wrong with server !',
        msg: null,
        ok: false,
      };
    }
  }

  async updateCategoryById(data: UpdateCategoryDto): Promise<CommonResponse> {
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
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async deleteCategoryById(id: string): Promise<CommonResponse> {
    try {
      await this.CategoryModel.deleteOne({ _id: id }).exec();
      await this.PostService.removeAllById(id);
      return {
        code: 200,
        error: null,
        ok: true,
        msg: 'Delete category successful !',
      };
    } catch (error) {
      console.log('deleteCategory: ', error);
      return {
        code: 500,
        error: 'Something wrong with server !',
        msg: null,
        ok: false,
      };
    }
  }

  async findAll(categories: string[]): Promise<Category[]> {
    const categoriesData = await this.CategoryModel.find({
      _id: categories,
    }).exec();
    return categoriesData;
  }

  async findById(categoryId: string) {
    const category = await this.CategoryModel.findById(categoryId).exec();
    return category;
  }
}
