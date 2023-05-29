import { ConfigService } from '@nestjs/config';
import { GmailService } from './gmail.service';
import { User } from '../user.entity';
import { Model } from 'mongoose';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register.interface';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interfaces/login.interface';
import type { Response } from 'express';
import { TokenService } from './jwt.service';
import { UpdateDto } from '../dto/update.dto';
import { PasswordDto } from '../dto/password.dto';
import { ActiveDto } from '../dto/active.dto';
import { Token } from '../token.entity';
import { CommonResponse } from 'src/interfaces/common.interface';
import { BaseUser, SafeUser } from '../interfaces/user.interface';
import { RefreshTokenResponse } from '../interfaces/refreshToken.interface';
export declare class UserService {
    private UserModel;
    private TokenModel;
    private TokenService;
    private GmailService;
    private ConfigService;
    constructor(UserModel: Model<User>, TokenModel: Model<Token>, TokenService: TokenService, GmailService: GmailService, ConfigService: ConfigService);
    getDataUser(userId: string): Promise<SafeUser>;
    getBaseUser(userId: string): Promise<BaseUser>;
    register(data: RegisterDto): Promise<RegisterResponse>;
    activeAccount(data: ActiveDto): Promise<CommonResponse>;
    forgotPassword(email: string): Promise<CommonResponse>;
    changePassword(password: string, userId: string): Promise<CommonResponse>;
    login(data: LoginDto, res: Response): Promise<LoginResponse>;
    logout(id: string, res: Response): Promise<CommonResponse>;
    updateData(dataUpdate: UpdateDto, userId: string): Promise<CommonResponse>;
    updatePassword(data: PasswordDto, userId: string, res: Response): Promise<CommonResponse>;
    refreshAccessToken(userId: string, res: Response): Promise<RefreshTokenResponse>;
    findById(userId: string): Promise<Omit<User, 'password'>>;
}