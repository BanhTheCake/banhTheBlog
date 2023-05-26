"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("@nestjs/config");
const gmail_service_1 = require("./gmail.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user.entity");
const mongoose_2 = require("mongoose");
const argon2 = require("argon2");
const jwt_service_1 = require("./jwt.service");
const cookies_1 = require("../../config/cookies");
const uuidv4_1 = require("uuidv4");
const token_entity_1 = require("../token.entity");
let UserService = class UserService {
    constructor(UserModel, TokenModel, TokenService, GmailService, ConfigService) {
        this.UserModel = UserModel;
        this.TokenModel = TokenModel;
        this.TokenService = TokenService;
        this.GmailService = GmailService;
        this.ConfigService = ConfigService;
    }
    async getDataUser(userId) {
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
        }
        catch (error) {
            console.log('GetDataUser: ', error);
            return null;
        }
    }
    async getBaseUser(userId) {
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
            };
        }
        catch (error) {
            console.log('GetDataUser: ', error);
            return null;
        }
    }
    async register(data) {
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
            const activeToken = (0, uuidv4_1.uuid)();
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
        <a href="${this.ConfigService.get('CLIENT_URL')}/active?token=${activeToken}&gmail=${data.email}" target="_blank">
          View Link
        </a>`,
            });
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Register successful! Please check your email !',
            };
        }
        catch (error) {
            console.log('Register: ', error);
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async activeAccount(data) {
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
        }
        catch (error) {
            console.log('ActiveAccount: ', error);
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async forgotPassword(email) {
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
              <a href="${this.ConfigService.get('CLIENT_URL')}/forgot?token=${forgotToken}&userId=${currentUser._id}" target="_blank">
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
        }
        catch (error) {
            console.log('ForgotPassword: ', error);
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async changePassword(password, userId) {
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
        }
        catch (error) {
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
            };
        }
    }
    async login(data, res) {
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
            res.cookie('refreshToken', refreshToken, Object.assign(Object.assign({}, cookies_1.default), { maxAge: 1000 * 60 * 60 * 24 }));
            currentUser.refreshToken = refreshToken;
            await currentUser.save();
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Login successful !',
                token: accessToken,
            };
        }
        catch (error) {
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
    async logout(id, res) {
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
    async updateData(dataUpdate, userId) {
        const currentUser = await this.UserModel.findById(userId).exec();
        if (!currentUser)
            return {
                code: 400,
                error: 'Bad Request !',
                msg: null,
                ok: true,
            };
        await this.UserModel.updateOne({ _id: currentUser._id }, Object.assign({}, dataUpdate)).exec();
        return {
            code: 200,
            error: null,
            msg: 'Update data user successful',
            ok: true,
        };
    }
    async updatePassword(data, userId, res) {
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
    async refreshAccessToken(userId, res) {
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
            res.cookie('refreshToken', refreshToken, Object.assign(Object.assign({}, cookies_1.default), { maxAge: 1000 * 60 * 60 * 24 }));
            currentUser.refreshToken = refreshToken;
            await currentUser.save();
            return {
                code: 200,
                ok: true,
                error: null,
                msg: 'Refresh token successful !',
                token: accessToken,
            };
        }
        catch (error) {
            return {
                code: 500,
                ok: false,
                error: 'Something wrong with server !',
                msg: null,
                token: null,
            };
        }
    }
    async findById(userId) {
        const user = await this.UserModel.findById(userId).exec();
        const userObject = user.toObject();
        delete userObject.password;
        return userObject;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_entity_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_service_1.TokenService,
        gmail_service_1.GmailService,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map