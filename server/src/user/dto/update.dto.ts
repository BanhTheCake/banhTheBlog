import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength, IsUrl } from 'class-validator';

@ArgsType()
export class UpdateDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  img?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(5)
  username: string;
}
