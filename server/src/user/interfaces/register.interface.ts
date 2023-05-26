import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Response } from 'src/interfaces/response.interface';
import { User } from '../user.entity';

@ObjectType({
  implements: () => [Response],
})
export class RegisterResponse implements Response {
  code: number;
  ok: boolean;
  error: string;
  msg: string;
}
