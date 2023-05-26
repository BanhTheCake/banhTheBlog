import { Field, ArgsType, InputType } from '@nestjs/graphql';
import { PostsPaginationDto } from './posts.pagination.dto';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SearchDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  categorySlug?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  query?: string;
}

@ArgsType()
export class SearchPostsPaginationDto extends PostsPaginationDto {
  @Field(() => SearchDto)
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SearchDto)
  search: SearchDto;
}
