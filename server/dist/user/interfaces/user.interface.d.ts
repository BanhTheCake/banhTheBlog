import { Response } from 'src/interfaces/response.interface';
import { User } from '../user.entity';
declare const SafeUser_base: import("@nestjs/common").Type<Omit<User, keyof User>>;
export declare class SafeUser extends SafeUser_base {
}
declare const BaseUser_base: import("@nestjs/common").Type<Pick<User, keyof User>>;
export declare class BaseUser extends BaseUser_base {
}
export declare class UserResponse implements Response {
    code: number;
    error: string;
    ok: boolean;
    msg: string;
    user: SafeUser;
}
export {};
