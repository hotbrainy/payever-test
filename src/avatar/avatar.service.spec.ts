import { Test, TestingModule } from '@nestjs/testing';
import { AvatarService } from './avatar.service';
import { UserModule } from '../user/user.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Avatar } from './schemas/avatar.schema';
import { Model } from 'mongoose';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';

describe('AvatarService', () => {
  let service: AvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/payever-test'),
        RabbitmqModule,
        UserModule,
        MailModule,
      ],
      providers: [
        AvatarService,
        MailService,
        {
          provide: getModelToken(User.name),
          useValue: Model<User>,
        },
        {
          provide: getModelToken(Avatar.name),
          useValue: Model<Avatar>,
        },
      ],
    }).compile();

    service = module.get<AvatarService>(AvatarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
