import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
    RabbitmqModule,
  ],
  controllers: [AvatarController],
  providers: [
    AvatarService,
    {
      provide: getModelToken(User.name),
      useValue: Model<User>,
    },
    {
      provide: getModelToken(Avatar.name),
      useValue: Model<Avatar>,
    },
  ],
})
export class AvatarModule {}
