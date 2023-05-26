import { PostService } from './../../post/services/post.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Category } from '../category.entity';
import { CategoryService } from '../services/category.service';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AccessTokenGuard } from 'src/user/guards/accessToken.guard';
import { CommonResponse } from 'src/interfaces/common.interface';
import { createCategoryDto } from '../dto/create.dto';
import { RolesApplied } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { UpdateCategoryDto } from '../dto/update.dto';
import { Post } from 'src/post/post.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private CategoryService: CategoryService,
    @Inject(forwardRef(() => PostService)) private PostService: PostService,
  ) {}

  @Query(() => String)
  categoryHello() {
    return 'hello from category resolver ';
  }

  @Query(() => Category, { nullable: true })
  category(@Args('id', { type: () => String }) id: string) {
    return this.CategoryService.findById(id);
  }

  @Query(() => [Category])
  categories() {
    return this.CategoryService.getAllCategories();
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  createCategory(@Args() data: createCategoryDto) {
    return this.CategoryService.createCategory(data);
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  updateCategoryById(@Args() data: UpdateCategoryDto) {
    return this.CategoryService.updateCategoryById(data);
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  deleteCategoryById(@Args('_id', { type: () => String }) id: string) {
    return this.CategoryService.deleteCategoryById(id);
  }
}
