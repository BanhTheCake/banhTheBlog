import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForgotTokenParams } from '../services/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../token.entity';
import { Model } from 'mongoose';

@Injectable()
export class ForgotTokenStrategy extends PassportStrategy(
  Strategy,
  'forgotToken',
) {
  constructor(
    ConfigService: ConfigService,
    @InjectModel(Token.name) private TokenModel: Model<Token>,
  ) {
    const key = ConfigService.get<string>('FORGOT_TOKEN_SECRET');
    console.log(key);
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ForgotTokenStrategy.getFromHeader,
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: key,
    });
  }

  static getFromHeader(req: Request) {
    const forgotToken = req.headers['token'] as string;
    return forgotToken;
  }

  async validate(req: Request, payload: ForgotTokenParams) {
    const forgotToken = req.headers?.['token'] as string;
    const currentUser = await this.TokenModel.findOne({
      userId: payload.userId,
      token: forgotToken,
    }).exec();
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
