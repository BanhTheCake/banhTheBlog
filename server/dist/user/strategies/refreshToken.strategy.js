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
var RefreshTokenStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenStrategy = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user.entity");
const mongoose_2 = require("mongoose");
let RefreshTokenStrategy = RefreshTokenStrategy_1 = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refreshToken') {
    constructor(ConfigService, UserModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                RefreshTokenStrategy_1.getFromCookie,
            ]),
            passReqToCallback: true,
            ignoreExpiration: false,
            secretOrKey: ConfigService.get('REFRESH_TOKEN_SECRET'),
        });
        this.UserModel = UserModel;
    }
    static getFromCookie(req) {
        const refreshToken = req.cookies['refreshToken'];
        return refreshToken;
    }
    async validate(req, payload) {
        const refreshToken = req.cookies['refreshToken'];
        const currentUser = await this.UserModel.findById(payload.userId).exec();
        if (!currentUser || refreshToken !== currentUser.refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        return payload;
    }
};
RefreshTokenStrategy = RefreshTokenStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], RefreshTokenStrategy);
exports.RefreshTokenStrategy = RefreshTokenStrategy;
//# sourceMappingURL=refreshToken.strategy.js.map