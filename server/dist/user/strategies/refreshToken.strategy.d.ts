import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RefreshTokenParams } from '../services/jwt.service';
import { User } from '../user.entity';
import { Model } from 'mongoose';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private UserModel;
    constructor(ConfigService: ConfigService, UserModel: Model<User>);
    static getFromCookie(req: Request): any;
    validate(req: Request, payload: RefreshTokenParams): Promise<RefreshTokenParams>;
}
export {};
