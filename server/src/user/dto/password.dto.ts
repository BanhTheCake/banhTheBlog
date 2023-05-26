import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class PasswordDto {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
