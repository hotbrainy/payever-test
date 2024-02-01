import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AvatarModule } from '../avatar/avatar.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Avatar } from '../avatar/schemas/avatar.schema';
import { Model } from 'mongoose';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/payever-test'),
        RabbitmqModule,
        AvatarModule,
        MailModule,
      ],
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
