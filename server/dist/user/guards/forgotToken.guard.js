"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotTokenGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class ForgotTokenGuard extends (0, passport_1.AuthGuard)('forgotToken') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
exports.ForgotTokenGuard = ForgotTokenGuard;
//# sourceMappingURL=forgotToken.guard.js.map