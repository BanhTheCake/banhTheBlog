"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const user_resolver_1 = require("./resolvers/user.resolver");
const user_service_1 = require("./services/user.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_service_1 = require("./services/jwt.service");
const accessToken_strategy_1 = require("./strategies/accessToken.strategy");
const refreshToken_strategy_1 = require("./strategies/refreshToken.strategy");
const gmail_service_1 = require("./services/gmail.service");
const token_entity_1 = require("./token.entity");
const forgotToken_strategy_1 = require("./strategies/forgotToken.strategy");
const post_module_1 = require("../post/post.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_entity_1.User.name,
                    schema: user_entity_1.UserSchema,
                },
                {
                    name: token_entity_1.Token.name,
                    schema: token_entity_1.TokenSchema,
                },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({}),
            (0, common_1.forwardRef)(() => post_module_1.PostModule),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            jwt_service_1.TokenService,
            accessToken_strategy_1.AccessTokenStrategy,
            refreshToken_strategy_1.RefreshTokenStrategy,
            forgotToken_strategy_1.ForgotTokenStrategy,
            gmail_service_1.GmailService,
        ],
        exports: [user_service_1.UserService, jwt_service_1.TokenService, gmail_service_1.GmailService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map