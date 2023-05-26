import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ActiveDto {
  @Field(() => String)
  @IsNotEmpty()
  token: string;

  @Field(() => String)
  @IsNotEmpty()
  email: string;
}
