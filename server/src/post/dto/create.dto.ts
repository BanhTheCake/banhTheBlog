import { ArgsType, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

@ArgsType()
export class CreatePostDto {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsUrl()
  img: string;

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  categories: string[];
}
