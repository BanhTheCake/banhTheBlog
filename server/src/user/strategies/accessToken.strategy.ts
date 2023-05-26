import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AccessTokenParams } from '../services/jwt.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  // static getFromCookie(req: Request) {
  //   const accessToken = req.cookies['accessToken'];
  //   return accessToken;
  // }

  validate(payload: AccessTokenParams) {
    return payload;
  }
}
