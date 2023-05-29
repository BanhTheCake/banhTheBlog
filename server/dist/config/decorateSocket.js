"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
function decorateGateway(class_, config) {
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: config.get('CLIENT_URL'),
            credentials: true,
        },
    })(class_);
}
exports.default = decorateGateway;
//# sourceMappingURL=decorateSocket.js.map