"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const googleapis_1 = require("googleapis");
const category_module_1 = require("./category/category.module");
const post_module_1 = require("./post/post.module");
const socket_module_1 = require("./socket/socket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async (config) => ({
                    uri: config.get('DATABASE_URL_MONGODB'),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    dbName: 'blogGraphQL',
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => {
                    const OAuth2 = googleapis_1.google.auth.OAuth2;
                    const myOAuth2Client = new OAuth2({
                        clientId: config.get('GOOGLE_CLIENT_ID'),
                        clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
                        redirectUri: 'https://developers.google.com/oauthplayground',
                    });
                    myOAuth2Client.setCredentials({
                        refresh_token: config.get('GOOGLE_REFRESH_TOKEN'),
                    });
                    const accessToken = myOAuth2Client.getAccessToken();
                    const mailerOptions = {
                        transport: {
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: config.get('GOOGLE_USER'),
                                clientId: config.get('GOOGLE_CLIENT_ID'),
                                clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
                                refreshToken: config.get('GOOGLE_REFRESH_TOKEN'),
                                accessToken: accessToken,
                            },
                        },
                    };
                    return mailerOptions;
                },
                inject: [config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                formatError: (error) => {
                    var _a, _b;
                    if ((_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.originalError) {
                        return Object.assign({}, (_b = error === null || error === void 0 ? void 0 : error.extensions) === null || _b === void 0 ? void 0 : _b.originalError);
                    }
                    const graphQLFormattedError = {
                        message: error === null || error === void 0 ? void 0 : error.message,
                    };
                    return graphQLFormattedError;
                },
                context: ({ req, res }) => ({ req, res }),
                playground: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            post_module_1.PostModule,
            socket_module_1.SocketModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map