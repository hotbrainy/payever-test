import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Avatar } from '../../avatar/schemas/avatar.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  avatar: Avatar;
}

export const UserSchema = SchemaFactory.createForClass(User);
