import { CategoryService } from './../../category/services/category.service';
import { PostService } from './../services/post.service';
import { User } from './../../user/user.entity';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../post.entity';
import { CommonResponse } from 'src/interfaces/common.interface';
import { CreatePostDto } from '../dto/create.dto';
import { Roles } from 'src/enums/roles.enum';
import { RolesApplied } from 'src/user/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/user/guards/accessToken.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AccessTokenParams } from 'src/user/services/jwt.service';
import { UserService } from 'src/user/services/user.service';
import { UserNoPassword } from 'src/user/interfaces/userNoPassword.interface';
import { Category } from 'src/category/category.entity';
import { UpdatePostDto } from '../dto/update.dto';
import { FavoritePostDto } from 'src/user/dto/favorite.dto';
import { Inject, forwardRef } from '@nestjs/common';
import { PostsPagination } from '../interfaces/posts.pagination.i';
import { PostsPaginationDto } from '../dto/posts.pagination.dto';
import { CategoryPostPaginationDto } from '../dto/categoryPosts.pagination.dto';
import { SearchPostsPaginationDto } from '../dto/searchPosts.pagination';
import { RelatedPostsDto } from '../dto/RelatedPosts.dto';
import { UserPostsPaginationDto } from '../dto/userPosts.pagination';
import { SocketGateway } from 'src/socket/socket.gateway';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private PostService: PostService,
    @Inject(forwardRef(() => UserService))
    private UserService: UserService,
    @Inject(forwardRef(() => CategoryService))
    private CategoryService: CategoryService,
  ) {}

  @Query(() => String)
  postHello() {
    return 'Hello from post !';
  }

  @Query(() => PostsPagination, { nullable: true, defaultValue: [] })
  posts(@Args() data: PostsPaginationDto) {
    return this.PostService.getAllPosts(data);
  }

  @Query(() => Post)
  post(@Args('id', { type: () => String }) id: string) {
    return this.PostService.findPostById(id);
  }

  @Query(() => Post, { nullable: true })
  postBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.PostService.findPostBySlug(slug);
  }

  @Query(() => PostsPagination, { nullable: true, defaultValue: [] })
  postsByCategoryId(
    @Args() { categoryId, limit, page }: CategoryPostPaginationDto,
  ) {
    return this.PostService.findAllPostByCategoryId(categoryId, {
      limit,
      page,
    });
  }

  @Query(() => PostsPagination, { nullable: true, defaultValue: [] })
  postsBySearch(@Args() { search, limit, page }: SearchPostsPaginationDto) {
    return this.PostService.findAllPostBySearch(search, {
      limit,
      page,
    });
  }

  @Query(() => PostsPagination, { nullable: true, defaultValue: [] })
  postsByUserId(@Args() { userId, limit, page }: UserPostsPaginationDto) {
    return this.PostService.findAllPostByUserId(userId, {
      limit,
      page,
    });
  }

  @Query(() => [Post])
  relatedPosts(@Args() data: RelatedPostsDto) {
    return this.PostService.findRelatedPost(data);
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  createNewPost(
    @Args() data: CreatePostDto,
    @CurrentUser() user: AccessTokenParams,
  ) {
    return this.PostService.createNewPost(data, user.userId);
  }

  @ResolveField(() => UserNoPassword)
  user(@Parent() post: Post) {
    return this.UserService.findById(post.user as unknown as string);
  }

  @ResolveField(() => [Category])
  categories(@Parent() post: Post) {
    return this.CategoryService.findAll(post.categories as unknown as string[]);
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  updatePostById(@Args() data: UpdatePostDto) {
    return this.PostService.updateById(data);
  }

  @RolesApplied(Roles.USER, Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  updateFavoriteUserPost(
    @Args() data: FavoritePostDto,
    @CurrentUser() user: AccessTokenParams,
  ) {
    return this.PostService.updateFavoriteUser(data, user.userId);
  }

  @RolesApplied(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Mutation(() => CommonResponse)
  deletePostById(@Args('id', { type: () => String }) id: string) {
    return this.PostService.deleteById(id);
  }
}
