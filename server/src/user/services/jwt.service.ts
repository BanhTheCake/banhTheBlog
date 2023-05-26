import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface AccessTokenParams {
  userId: string;
  role: string;
  email: string;
}

export interface RefreshTokenParams {
  userId: string;
  email: string;
  role: string;
}

export interface ForgotTokenParams {
  userId: string;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(
    private JwtService: JwtService,
    private ConfigService: ConfigService,
  ) {}

  generateAccessToken(accessToken: AccessTokenParams) {
    return this.JwtService.sign(accessToken, {
      secret: this.ConfigService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.ConfigService.get<string>('ACCESS_TOKEN_EXPIRED'),
    });
  }

  generateRefreshToken(refreshToken: RefreshTokenParams) {
    return this.JwtService.sign(refreshToken, {
      secret: this.ConfigService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.ConfigService.get<string>('REFRESH_TOKEN_EXPIRED'),
    });
  }

  generateForgotToken(forgotToken: ForgotTokenParams) {
    return this.JwtService.sign(forgotToken, {
      secret: this.ConfigService.get<string>('FORGOT_TOKEN_SECRET'),
      expiresIn: this.ConfigService.get<string>('FORGOT_TOKEN_EXPIRED'),
    });
  }
}
