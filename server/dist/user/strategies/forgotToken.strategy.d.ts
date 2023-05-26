import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForgotTokenParams } from '../services/jwt.service';
import { Token } from '../token.entity';
import { Model } from 'mongoose';
declare const ForgotTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class ForgotTokenStrategy extends ForgotTokenStrategy_base {
    private TokenModel;
    constructor(ConfigService: ConfigService, TokenModel: Model<Token>);
    static getFromHeader(req: Request): string;
    validate(req: Request, payload: ForgotTokenParams): Promise<ForgotTokenParams>;
}
export {};
