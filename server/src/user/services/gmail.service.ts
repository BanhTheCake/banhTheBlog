import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface EmailOptions {
  to: string;
  title: string;
  html: string;
}

@Injectable()
export class GmailService {
  constructor(
    private MailerService: MailerService,
    private ConfigService: ConfigService,
  ) {}

  async sendEmail(opts: EmailOptions) {
    return new Promise<void>((resolve, reject) => {
      this.MailerService.sendMail({
        to: opts.to, // list of receivers
        from: this.ConfigService.get<string>('GOOGLE_USER'), // sender address
        subject: opts.title, // Subject line
        html: opts.html, // HTML body content
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
}
