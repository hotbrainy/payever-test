import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema()
export class Avatar {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  url: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
