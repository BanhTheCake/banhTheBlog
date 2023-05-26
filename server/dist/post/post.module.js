"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./services/post.service");
const post_resolver_1 = require("./resolver/post.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const post_entity_1 = require("./post.entity");
const user_module_1 = require("../user/user.module");
const category_module_1 = require("../category/category.module");
const socket_module_1 = require("../socket/socket.module");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: post_entity_1.Post.name,
                    schema: post_entity_1.PostSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => category_module_1.CategoryModule),
            socket_module_1.SocketModule,
        ],
        providers: [post_service_1.PostService, post_resolver_1.PostResolver],
        exports: [post_service_1.PostService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map