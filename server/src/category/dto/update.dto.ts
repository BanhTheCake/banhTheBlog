import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId } from 'class-validator';

@ArgsType()
export class UpdateCategoryDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  label: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;
}
