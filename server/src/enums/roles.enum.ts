import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(Roles, {
  name: 'Roles',
});
