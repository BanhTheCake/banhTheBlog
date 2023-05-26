import { Field, ArgsType } from '@nestjs/graphql';
import { PostsPaginationDto } from './posts.pagination.dto';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class RelatedPostsDto extends PostsPaginationDto {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  currentId: string;
}
