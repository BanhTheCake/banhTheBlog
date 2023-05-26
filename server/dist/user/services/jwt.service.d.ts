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
export declare class TokenService {
    private JwtService;
    private ConfigService;
    constructor(JwtService: JwtService, ConfigService: ConfigService);
    generateAccessToken(accessToken: AccessTokenParams): string;
    generateRefreshToken(refreshToken: RefreshTokenParams): string;
    generateForgotToken(forgotToken: ForgotTokenParams): string;
}
