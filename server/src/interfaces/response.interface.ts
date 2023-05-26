import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Response {
  @Field(() => Int)
  code: number;

  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => String, { nullable: true })
  msg: string;
}
