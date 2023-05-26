"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const graphql_1 = require("@nestjs/graphql");
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["USER"] = "user";
})(Roles = exports.Roles || (exports.Roles = {}));
(0, graphql_1.registerEnumType)(Roles, {
    name: 'Roles',
});
//# sourceMappingURL=roles.enum.js.map