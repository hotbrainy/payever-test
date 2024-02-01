import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
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

describe('UserController', () => {
  let controller: UserController;

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
      controllers: [UserController],
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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
