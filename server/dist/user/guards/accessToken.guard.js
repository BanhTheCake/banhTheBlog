"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class AccessTokenGuard extends (0, passport_1.AuthGuard)('accessToken') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
exports.AccessTokenGuard = AccessTokenGuard;
//# sourceMappingURL=accessToken.guard.js.map