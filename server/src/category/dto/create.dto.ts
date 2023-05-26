import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class createCategoryDto {
  @Field(() => String)
  @IsNotEmpty()
  label: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;
}
