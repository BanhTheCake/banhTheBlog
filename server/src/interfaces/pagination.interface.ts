import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPage: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalItem: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPrevPage: boolean;
}
