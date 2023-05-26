import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class UserNoPassword extends OmitType<User, keyof User>(User, [
  'password',
] as const) {}
