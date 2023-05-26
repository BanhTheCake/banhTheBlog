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
exports.GmailService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let GmailService = class GmailService {
    constructor(MailerService, ConfigService) {
        this.MailerService = MailerService;
        this.ConfigService = ConfigService;
    }
    async sendEmail(opts) {
        return new Promise((resolve, reject) => {
            this.MailerService.sendMail({
                to: opts.to,
                from: this.ConfigService.get('GOOGLE_USER'),
                subject: opts.title,
                html: opts.html,
            })
                .then(() => {
                console.log('Success');
                resolve();
            })
                .catch((error) => {
                console.log('failed: ', error);
                reject('Send email failed !');
            });
        });
    }
};
GmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], GmailService);
exports.GmailService = GmailService;
//# sourceMappingURL=gmail.service.js.map