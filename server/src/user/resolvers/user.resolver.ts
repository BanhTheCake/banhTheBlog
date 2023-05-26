import { BaseUser, SafeUser } from './../interfaces/user.interface';
import { PostsPagination } from './../../post/interfaces/posts.pagination.i';
import { PostService } from './../../post/services/post.service';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { User } from '../user.entity';
import { RegisterResponse } from '../interfaces/register.interface';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interfaces/login.interface';
import { ContextType } from 'src/interfaces/global';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { CurrentUser } from '../decorators/user.decorator';
import {
  AccessTokenParams,
  ForgotTokenParams,
  RefreshTokenParams,
} from '../services/jwt.service';
import { UpdateDto } from '../dto/update.dto';
import { PasswordDto } from '../dto/password.dto';
import { ActiveDto } from '../dto/active.dto';
import { ForgotTokenGuard } from '../guards/forgotToken.guard';
import { ForgotDto } from '../dto/forgot.dto';
import { CommonResponse } from 'src/interfaces/common.interface';
import { Inject, forwardRef } from '@nestjs/common';
import { PostsPaginationDto } from 'src/post/dto/posts.pagination.dto';
import { RefreshTokenResponse } from '../interfaces/refreshToken.interface';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private UserService: UserService,
    @Inject(forwardRef(() => PostService))
    private PostService: PostService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Query(() => BaseUser, { nullable: true })
  getBaseUser(@Args('userId', { type: () => String }) userId: string) {
    return this.UserService.getBaseUser(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => SafeUser, { nullable: true })
  getDataUser(@CurrentUser() user: RefreshTokenParams) {
    return this.UserService.getDataUser(user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => PostsPagination)
  getAllCreatedPost(
    @Args() data: PostsPaginationDto,
    @CurrentUser() user: AccessTokenParams,
  ) {
    return this.PostService.findAllPostByUserId(user.userId, data);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => PostsPagination)
  getAllFavoritePost(
    @Args() data: PostsPaginationDto,
    @CurrentUser() user: AccessTokenParams,
  ) {
    return this.PostService.findAllFavoritePostByUserId(user.userId, data);
  }

  @Mutation(() => RegisterResponse)
  register(@Args() data: RegisterDto) {
    return this.UserService.register(data);
  }

  @Mutation(() => CommonResponse)
  activeAccount(@Args() data: ActiveDto) {
    return this.UserService.activeAccount(data);
  }

  @Mutation(() => CommonResponse)
  forgotPassword(@Args('email', { type: () => String }) email: string) {
    return this.UserService.forgotPassword(email);
  }

  // For Forgot Password
  @UseGuards(ForgotTokenGuard)
  @Mutation(() => CommonResponse)
  changePassword(
    @Args() data: ForgotDto,
    @CurrentUser() user: ForgotTokenParams,
  ) {
    return this.UserService.changePassword(data.password, user.userId);
  }

  @Mutation(() => LoginResponse)
  login(@Args() data: LoginDto, @Context() context: ContextType) {
    return this.UserService.login(data, context.res);
  }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => CommonResponse)
  logout(@Args('id') id: string, @Context() context: ContextType) {
    return this.UserService.logout(id, context.res);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => CommonResponse)
  updateDataUser(
    @Args() dataUpdate: UpdateDto,
    @CurrentUser() user: AccessTokenParams,
  ) {
    return this.UserService.updateData(dataUpdate, user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => CommonResponse)
  updatePassword(
    @Args() data: PasswordDto,
    @CurrentUser() user: AccessTokenParams,
    @Context() context: ContextType,
  ) {
    return this.UserService.updatePassword(data, user.userId, context.res);
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => RefreshTokenResponse)
  refreshAccessToken(
    @CurrentUser() user: RefreshTokenParams,
    @Context() context: ContextType,
  ) {
    return this.UserService.refreshAccessToken(user.userId, context.res);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => String)
  accessToken(@CurrentUser() user: AccessTokenParams) {
    return 'Allow to access accessToken';
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => String)
  refreshToken(@CurrentUser() user: RefreshTokenParams) {
    return 'Allow to access refreshToken';
  }
}
