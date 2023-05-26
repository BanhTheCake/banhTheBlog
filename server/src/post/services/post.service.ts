import { Injectable } from '@nestjs/common';
import { Post } from '../post.entity';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonResponse } from 'src/interfaces/common.interface';
import { CreatePostDto } from '../dto/create.dto';
import { UpdatePostDto } from '../dto/update.dto';
import { FavoritePostDto } from 'src/user/dto/favorite.dto';
import { PostsPaginationDto } from '../dto/posts.pagination.dto';
import { PostsPagination } from '../interfaces/posts.pagination.i';
import { convert } from 'html-to-text';
import { SearchDto } from '../dto/searchPosts.pagination';
import { Category } from 'src/category/category.entity';
import { RelatedPostsDto } from '../dto/RelatedPosts.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import LIKE_ENUM from '../enums/like.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    private SocketGateway: SocketGateway,
  ) {}

  async getAllPosts({
    limit,
    page,
  }: PostsPaginationDto): Promise<PostsPagination> {
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

  async createNewPost(
    data: CreatePostDto,
    userId: string,
  ): Promise<CommonResponse> {
    try {
      const subContent = convert(data.content, {
        selectors: [
          { selector: 'a', options: { noAnchorUrl: true, ignoreHref: true } },
          {
            selector: 'img',
            format: 'skip',
          },
        ],
      }).slice(0, 100);
      await this.PostModel.create({
        ...data,
        subContent,
        user: userId,
      });
      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Create post successful !',
      };
    } catch (error) {
      console.log('Create new Post: ', error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async updateById(data: UpdatePostDto): Promise<CommonResponse> {
    try {
      const { postId, ...value } = data;
      const existPost = await this.PostModel.findOne({ _id: postId }).exec();
      if (!existPost) {
        return {
          code: 400,
          ok: false,
          error: 'PostId is not exist in our system !',
          msg: null,
        };
      }

      const updateInput: Record<string, any> = { ...value };
      if (data?.content) {
        updateInput.subContent = convert(data.content, {
          selectors: [
            { selector: 'a', options: { noAnchorUrl: true, ignoreHref: true } },
            {
              selector: 'img',
              format: 'skip',
            },
          ],
        }).slice(0, 100);
      }

      const updatePost = await this.PostModel.updateOne(
        { _id: postId },
        updateInput,
      ).exec();
      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Update post successful !',
      };
    } catch (error) {
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async findPostById(id: string) {
    const post = await this.PostModel.findById(id).exec();
    return post;
  }

  async findPostBySlug(slug: string) {
    const post = await this.PostModel.findOne({ slug }).exec();
    return post;
  }

  async updateFavoriteUser(
    data: FavoritePostDto,
    userId: string,
  ): Promise<CommonResponse> {
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

      const isInFavoritePost = Boolean(
        await this.PostModel.findOne({
          _id: data.id,
          favoritesUser: userId,
        }).exec(),
      );
      if (isInFavoritePost) {
        await this.PostModel.updateOne(
          {
            _id: data.id,
          },
          {
            $pull: { favoritesUser: userId },
            $set: {
              count:
                existPost.favoritesUser.length - 1 > 0
                  ? existPost.favoritesUser.length - 1
                  : 0,
            },
          },
        ).exec();

        this.SocketGateway.server.emit(`posts:${data.id}:likes`, {
          type: LIKE_ENUM.REMOVE,
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
      await this.PostModel.updateOne(
        {
          _id: data.id,
        },
        {
          $push: { favoritesUser: userId },
          $set: {
            count: existPost.favoritesUser.length + 1,
          },
        },
      ).exec();

      this.SocketGateway.server.emit(`posts:${data.id}:likes`, {
        type: LIKE_ENUM.UPDATE,
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
    } catch (error) {
      return {
        code: 500,
        error: 'Something wrong with server !',
        ok: false,
        msg: null,
      };
    }
  }

  async findAllPostByUserId(
    userId: string,
    { limit, page }: PostsPaginationDto,
  ): Promise<PostsPagination> {
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

  async findAllFavoritePostByUserId(
    userId: string,
    { limit, page }: PostsPaginationDto,
  ): Promise<PostsPagination> {
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

  async findAllPostByCategoryId(
    categoryId: string,
    { limit, page }: PostsPaginationDto,
  ): Promise<PostsPagination> {
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

  async findAllPostBySearch(
    search: SearchDto,
    { limit, page }: PostsPaginationDto,
  ): Promise<PostsPagination> {
    try {
      const limitModify = limit > 0 ? limit : 4;
      const pageModify = page > 0 ? page : 1;
      const offset = (pageModify - 1) * limitModify;

      const { categorySlug, query } = search;
      let whereOptions: FilterQuery<Post> = {};

      // a

      if (categorySlug && categorySlug !== 'all') {
        whereOptions = { ...whereOptions, 'categories.slug': categorySlug };
      }

      if (query) {
        whereOptions = {
          ...whereOptions,
          $or: [
            {
              title: { $regex: query, $options: 'i' },
            },
            {
              content: { $regex: query, $options: 'i' },
            },
          ],
        };
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
      ]).exec()) as { countPosts: number }[];

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
    } catch (error) {
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

  async findRelatedPost({
    categories,
    userId,
    currentId,
    limit,
  }: RelatedPostsDto): Promise<Post[]> {
    const limitModify = limit > 0 ? limit : 4;

    let whereCondition: FilterQuery<Post> = {
      _id: { $ne: currentId },
    };

    if (categories) {
      whereCondition = { categories: { $in: categories }, ...whereCondition };
    }

    if (userId) {
      whereCondition = { user: userId, ...whereCondition };
    }

    const posts = await this.PostModel.find(whereCondition)
      .limit(limitModify)
      .exec();

    return posts;
  }

  async removeAllById(id: string) {
    try {
      console.log(id);
      await this.PostModel.updateMany(
        { categories: id },
        {
          $pull: {
            categories: id,
          },
        },
      ).exec();
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<CommonResponse> {
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
    } catch (error) {
      return {
        code: 500,
        error: 'Something wrong with server',
        msg: null,
        ok: false,
      };
    }
  }
}
