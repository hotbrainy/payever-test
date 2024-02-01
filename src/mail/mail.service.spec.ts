import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { AvatarModule } from '../avatar/avatar.module';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/payever-test'),
        RabbitmqModule,
        AvatarModule,
        MailerModule.forRootAsync({
          // imports: [ConfigModule], // import module if not enabled globally
          useFactory: async (config: ConfigService) => ({
            // transport: config.get("MAIL_TRANSPORT"),
            // or
            transport: {
              host: config.get('MAIL_HOST'),
              secure: false,
              auth: {
                user: config.get('MAIL_USER'),
                pass: config.get('MAIL_PASSWORD'),
              },
            },
            defaults: {
              from: `"No Reply" <${config.get('MAIL_FROM')}>`,
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        UserService,
        MailService,
        {
          provide: getModelToken(User.name),
          useValue: Model<User>,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
