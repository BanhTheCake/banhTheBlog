import { Field, ArgsType } from '@nestjs/graphql';
import { PostsPaginationDto } from './posts.pagination.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class CategoryPostPaginationDto extends PostsPaginationDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;
}
