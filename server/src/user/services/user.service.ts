import { ConfigService } from '@nestjs/config';
import { GmailService } from './gmail.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.entity';
import { Model } from 'mongoose';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register.interface';
import * as argon2 from 'argon2';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interfaces/login.interface';
import type { Response } from 'express';
import { TokenService } from './jwt.service';
import cookieConfig from 'src/config/cookies';
import { UpdateDto } from '../dto/update.dto';
import { PasswordDto } from '../dto/password.dto';
import { uuid } from 'uuidv4';
import { ActiveDto } from '../dto/active.dto';
import { Token } from '../token.entity';
import { CommonResponse } from 'src/interfaces/common.interface';
import { BaseUser, SafeUser } from '../interfaces/user.interface';
import { RefreshTokenResponse } from '../interfaces/refreshToken.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Token.name) private TokenModel: Model<Token>,
    private TokenService: TokenService,
    private GmailService: GmailService,
    private ConfigService: ConfigService,
  ) {}

  async getDataUser(userId: string): Promise<SafeUser> {
    try {
      const currentUser = await this.UserModel.findOne({
        _id: userId,
      }).exec();

      if (!currentUser) {
        return null;
      }
      const userObject = currentUser.toObject();
      delete userObject.password;

      return userObject;
    } catch (error) {
      console.log('GetDataUser: ', error);
      return null;
    }
  }
  async getBaseUser(userId: string): Promise<BaseUser> {
    try {
      const currentUser = await this.UserModel.findOne({
        _id: userId,
      }).exec();

      if (!currentUser) {
        return null;
      }
      const userObject = currentUser.toObject();
      delete userObject.password;

      return {
        _id: userObject._id,
        img: userObject.img,
        createdAt: userObject.createdAt,
        email: userObject.email,
        username: userObject.username,
      } as BaseUser;
    } catch (error) {
      console.log('GetDataUser: ', error);
      return null;
    }
  }

  async register(data: RegisterDto): Promise<RegisterResponse> {
    try {
      const existUser = await this.UserModel.findOne({
        email: data.email,
      }).exec();
      if (existUser) {
        return {
          code: 400,
          ok: false,
          error: 'Email has been exist in our system !',
          msg: null,
        };
      }
      const hashPassword = await argon2.hash(data.password);
      const activeToken = uuid();

      await this.UserModel.create({
        username: data.username,
        email: data.email,
        password: hashPassword,
        activeToken: activeToken,
      });

      await this.GmailService.sendEmail({
        to: data.email,
        title: 'Activated Your Account !',
        html: `<p>Your Link verification is: </p>
        <a href="${this.ConfigService.get<string>(
          'CLIENT_URL',
        )}/active?token=${activeToken}&gmail=${data.email}" target="_blank">
          View Link
        </a>`,
      });

      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Register successful! Please check your email !',
      };
    } catch (error) {
      console.log('Register: ', error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async activeAccount(data: ActiveDto): Promise<CommonResponse> {
    try {
      const currentUser = await this.UserModel.findOne({
        activeToken: data.token,
        email: data.email,
        firstLogin: true,
      }).exec();
      if (!currentUser)
        return {
          code: 400,
          ok: false,
          error: 'Your email may not exist or already activated !',
          msg: null,
        };
      currentUser.activeToken = null;
      currentUser.firstLogin = false;
      await currentUser.save();

      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Verify Account Successful !',
      };
    } catch (error) {
      console.log('ActiveAccount: ', error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async forgotPassword(email: string): Promise<CommonResponse> {
    try {
      const currentUser = await this.UserModel.findOne({ email: email }).exec();

      if (currentUser) {
        const isExists = await this.TokenModel.findOne({
          userId: currentUser._id,
        }).exec();
        if (!isExists) {
          const forgotToken = this.TokenService.generateForgotToken({
            email: currentUser.email,
            userId: currentUser._id,
          });

          await Promise.all([
            this.TokenModel.create({
              token: forgotToken,
              userId: currentUser._id,
            }),
            this.GmailService.sendEmail({
              to: currentUser.email,
              title: 'Request for reset password !',
              html: `<p>Your Link forgot password is (Link will be expired in 1 hours): </p>
              <a href="${this.ConfigService.get<string>(
                'CLIENT_URL',
              )}/forgot?token=${forgotToken}&userId=${
                currentUser._id
              }" target="_blank">
                View Link
              </a>`,
            }),
          ]);
        }
      }
      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Please check your email !',
      };
    } catch (error) {
      console.log('ForgotPassword: ', error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async changePassword(
    password: string,
    userId: string,
  ): Promise<CommonResponse> {
    try {
      const currentUser = await this.UserModel.findById(userId).exec();
      if (!currentUser) {
        return {
          code: 400,
          ok: false,
          error: 'User is not exists in our system !',
          msg: null,
        };
      }

      const hashPassword = await argon2.hash(password);
      currentUser.password = hashPassword;
      await Promise.all([
        currentUser.save(),
        this.TokenModel.deleteOne({ userId: userId }),
      ]);
      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Reset password successful !',
      };
    } catch (error) {
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
      };
    }
  }

  async login(data: LoginDto, res: Response): Promise<LoginResponse> {
    try {
      const currentUser = await this.UserModel.findOne({
        email: data.email,
      }).exec();
      if (!currentUser) {
        return {
          code: 400,
          ok: false,
          error: 'email or password is incorrect !',
          msg: null,
          token: null,
        };
      }
      const isMatch = await argon2.verify(currentUser.password, data.password);

      if (!isMatch)
        return {
          code: 400,
          ok: false,
          error: 'email or password is incorrect !',
          msg: null,
          token: null,
        };

      const userObject = currentUser.toObject();
      delete userObject.password;

      if (currentUser.firstLogin) {
        return {
          code: 404,
          ok: false,
          error: 'Please verify your email',
          msg: null,
          token: null,
        };
      }

      const accessToken = this.TokenService.generateAccessToken({
        userId: userObject._id,
        email: userObject.email,
        role: userObject.role,
      });

      const refreshToken = this.TokenService.generateRefreshToken({
        userId: userObject._id,
        email: userObject.email,
        role: userObject.role,
      });

      res.cookie('refreshToken', refreshToken, {
        ...cookieConfig,
        maxAge: 1000 * 60 * 60 * 24,
      });

      currentUser.refreshToken = refreshToken;
      await currentUser.save();

      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Login successful !',
        token: accessToken,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
        token: null,
      };
    }
  }

  async logout(id: string, res: Response): Promise<CommonResponse> {
    const currentUser = await this.UserModel.findById(id).exec();
    if (currentUser) {
      currentUser.refreshToken = null;
      res.cookie('refreshToken', null, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      await currentUser.save();
    }
    return {
      code: 200,
      ok: true,
      error: null,
      msg: 'Logout successful',
    };
  }

  async updateData(
    dataUpdate: UpdateDto,
    userId: string,
  ): Promise<CommonResponse> {
    const currentUser = await this.UserModel.findById(userId).exec();
    if (!currentUser)
      return {
        code: 400,
        error: 'Bad Request !',
        msg: null,
        ok: true,
      };

    await this.UserModel.updateOne(
      { _id: currentUser._id },
      {
        ...dataUpdate,
      },
    ).exec();

    return {
      code: 200,
      error: null,
      msg: 'Update data user successful',
      ok: true,
    };
  }

  async updatePassword(
    data: PasswordDto,
    userId: string,
    res: Response,
  ): Promise<CommonResponse> {
    const currentUser = await this.UserModel.findById(userId).exec();
    if (!currentUser)
      return {
        code: 400,
        error: 'Bad Request !',
        msg: null,
        ok: true,
      };

    const isMatch = await argon2.verify(currentUser.password, data.password);
    if (!isMatch)
      return {
        code: 400,
        ok: false,
        error: 'Password is not match !',
        msg: null,
      };

    const hashNewPassword = await argon2.hash(data.newPassword);
    currentUser.password = hashNewPassword;
    currentUser.refreshToken = null;

    res.cookie('refreshToken', null, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    await currentUser.save();

    return {
      code: 200,
      ok: true,
      error: null,
      msg: 'Update password successful. Please login again !',
    };
  }

  async refreshAccessToken(
    userId: string,
    res: Response,
  ): Promise<RefreshTokenResponse> {
    try {
      const currentUser = await this.UserModel.findById(userId).exec();
      if (!currentUser)
        return {
          code: 400,
          error: 'Bad Request !',
          msg: null,
          ok: true,
          token: null,
        };

      const accessToken = this.TokenService.generateAccessToken({
        email: currentUser.email,
        role: currentUser.role,
        userId: currentUser._id,
      });

      const refreshToken = this.TokenService.generateRefreshToken({
        email: currentUser.email,
        userId: currentUser._id,
        role: currentUser.role,
      });

      res.cookie('refreshToken', refreshToken, {
        ...cookieConfig,
        maxAge: 1000 * 60 * 60 * 24,
      });

      currentUser.refreshToken = refreshToken;
      await currentUser.save();

      return {
        code: 200,
        ok: true,
        error: null,
        msg: 'Refresh token successful !',
        token: accessToken,
      };
    } catch (error) {
      return {
        code: 500,
        ok: false,
        error: 'Something wrong with server !',
        msg: null,
        token: null,
      };
    }
  }

  async findById(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.UserModel.findById(userId).exec();
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }
}
