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
var ForgotTokenStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotTokenStrategy = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const mongoose_1 = require("@nestjs/mongoose");
const token_entity_1 = require("../token.entity");
const mongoose_2 = require("mongoose");
let ForgotTokenStrategy = ForgotTokenStrategy_1 = class ForgotTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'forgotToken') {
    constructor(ConfigService, TokenModel) {
        const key = ConfigService.get('FORGOT_TOKEN_SECRET');
        console.log(key);
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                ForgotTokenStrategy_1.getFromHeader,
            ]),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: key,
        });
        this.TokenModel = TokenModel;
    }
    static getFromHeader(req) {
        const forgotToken = req.headers['token'];
        return forgotToken;
    }
    async validate(req, payload) {
        var _a;
        const forgotToken = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['token'];
        const currentUser = await this.TokenModel.findOne({
            userId: payload.userId,
            token: forgotToken,
        }).exec();
        if (!currentUser) {
            throw new common_1.UnauthorizedException();
        }
        return payload;
    }
};
ForgotTokenStrategy = ForgotTokenStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(token_entity_1.Token.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], ForgotTokenStrategy);
exports.ForgotTokenStrategy = ForgotTokenStrategy;
//# sourceMappingURL=forgotToken.strategy.js.map