"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class RefreshTokenGuard extends (0, passport_1.AuthGuard)('refreshToken') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
exports.RefreshTokenGuard = RefreshTokenGuard;
//# sourceMappingURL=refreshToken.guard.js.map