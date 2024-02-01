import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendUserConfirmation(user: User, token: string) {
    const url = `https://www.payever.com/auth/confirm?token=${token}`;
    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Welcome to Payever Test App! Confirm your Email',
        template: './confirmation',
        context: {
          name: user.email,
          url,
        },
      })
      .catch((e) => {
        console.log(`Failed sending email ${e.toString()}`);
      });
  }
}
