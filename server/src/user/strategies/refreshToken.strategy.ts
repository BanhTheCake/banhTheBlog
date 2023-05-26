import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { RefreshTokenParams } from '../services/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.entity';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    ConfigService: ConfigService,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.getFromCookie,
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: ConfigService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  static getFromCookie(req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    return refreshToken;
  }

  async validate(req: Request, payload: RefreshTokenParams) {
    const refreshToken = req.cookies['refreshToken'];
    const currentUser = await this.UserModel.findById(payload.userId).exec();
    if (!currentUser || refreshToken !== currentUser.refreshToken) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
