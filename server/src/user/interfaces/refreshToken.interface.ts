import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/interfaces/response.interface';

@ObjectType({
  implements: () => [Response],
})
export class RefreshTokenResponse implements Response {
  code: number;
  ok: boolean;
  error: string;
  msg: string;

  @Field(() => String, { nullable: true })
  token: string;
}
