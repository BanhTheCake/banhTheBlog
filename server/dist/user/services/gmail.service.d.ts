import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
export interface EmailOptions {
    to: string;
    title: string;
    html: string;
}
export declare class GmailService {
    private MailerService;
    private ConfigService;
    constructor(MailerService: MailerService, ConfigService: ConfigService);
    sendEmail(opts: EmailOptions): Promise<void>;
}
