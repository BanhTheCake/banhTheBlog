"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieConfig = {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
};
exports.default = cookieConfig;
//# sourceMappingURL=cookies.js.map