import { User } from '../user.entity';
declare const UserNoPassword_base: import("@nestjs/common").Type<Omit<User, keyof User>>;
export declare class UserNoPassword extends UserNoPassword_base {
}
export {};
