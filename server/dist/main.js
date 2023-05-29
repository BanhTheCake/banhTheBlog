"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const decorateSocket_1 = require("./config/decorateSocket");
const socket_gateway_1 = require("./socket/socket.gateway");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.enableCors({
        credentials: true,
        origin: config.get('CLIENT_URL'),
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    (0, decorateSocket_1.default)(socket_gateway_1.SocketGateway, config);
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map