import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AccessTokenParams } from '../services/jwt.service';
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor(ConfigService: ConfigService);
    validate(payload: AccessTokenParams): AccessTokenParams;
}
export {};
