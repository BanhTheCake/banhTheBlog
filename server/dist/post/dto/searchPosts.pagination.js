"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPostsPaginationDto = exports.SearchDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_pagination_dto_1 = require("./posts.pagination.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let SearchDto = class SearchDto {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchDto.prototype, "categorySlug", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "query", void 0);
SearchDto = __decorate([
    (0, graphql_1.InputType)()
], SearchDto);
exports.SearchDto = SearchDto;
let SearchPostsPaginationDto = class SearchPostsPaginationDto extends posts_pagination_dto_1.PostsPaginationDto {
};
__decorate([
    (0, graphql_1.Field)(() => SearchDto),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SearchDto),
    __metadata("design:type", SearchDto)
], SearchPostsPaginationDto.prototype, "search", void 0);
SearchPostsPaginationDto = __decorate([
    (0, graphql_1.ArgsType)()
], SearchPostsPaginationDto);
exports.SearchPostsPaginationDto = SearchPostsPaginationDto;
//# sourceMappingURL=searchPosts.pagination.js.map