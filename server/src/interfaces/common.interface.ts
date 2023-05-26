import { ObjectType } from '@nestjs/graphql';
import { Response } from 'src/interfaces/response.interface';

@ObjectType({
  implements: () => [Response],
})
export class CommonResponse implements Response {
  code: number;
  ok: boolean;
  error: string;
  msg: string;
}
