import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enums/roles.enum';

export const ROLES_KEY = 'roles';
export const RolesApplied = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
