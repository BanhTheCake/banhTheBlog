import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class RegisterDto {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
