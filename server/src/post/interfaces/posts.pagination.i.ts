import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/interfaces/pagination.interface';
import { Post } from '../post.entity';

@ObjectType()
export class PostsPagination extends Pagination {
  @Field(() => [Post], { nullable: true, defaultValue: [] })
  PostPagination: Post[];
}
