import { ObjectType, OmitType, Field, PickType } from '@nestjs/graphql';
import { Response } from 'src/interfaces/response.interface';
import { User } from '../user.entity';

@ObjectType()
export class SafeUser extends OmitType<User, keyof User>(User, [
  'password',
] as const) {}

@ObjectType()
export class BaseUser extends PickType<User, keyof User>(User, [
  '_id',
  'img',
  'createdAt',
  'username',
  'email',
] as const) {}

@ObjectType({
  implements: () => [Response],
})
export class UserResponse implements Response {
  code: number;
  error: string;
  ok: boolean;
  msg: string;

  @Field(() => SafeUser, { nullable: true })
  user: SafeUser;
}
