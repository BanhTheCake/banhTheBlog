import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class ForgotDto {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
