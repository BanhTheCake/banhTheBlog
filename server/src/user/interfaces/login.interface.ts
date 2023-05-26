import { ObjectType, OmitType, Field } from '@nestjs/graphql';
import { Response } from 'src/interfaces/response.interface';
import { SafeUser } from './user.interface';

@ObjectType({
  implements: () => [Response],
})
export class LoginResponse implements Response {
  code: number;
  error: string;
  ok: boolean;
  msg: string;

  @Field(() => String, { nullable: true })
  token: string;
}
