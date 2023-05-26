import { ExecutionContext } from '@nestjs/common';
declare const ForgotTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class ForgotTokenGuard extends ForgotTokenGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
