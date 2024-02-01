import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Avatar } from './schemas/avatar.schema';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AvatarService {
  constructor(
    @InjectModel(Avatar.name) private avatarModel: Model<Avatar>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findOne(id: string) {
    const isValidObjectId = Types.ObjectId.isValid(id);
    if (isValidObjectId) {
      const avatarRow = await this.avatarModel
        .findOne({ userId: id })
        .select('url');
      if (avatarRow?.url) {
        const img = fs.readFileSync(avatarRow.url);
        const base64Img = Buffer.from(img).toString('base64');
        return base64Img;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  async deleteOne(id: string) {
    const isValidObjectId = Types.ObjectId.isValid(id);
    if (isValidObjectId) {
      const foundUser = await this.userModel.findById(id);
      if (foundUser?.avatar) {
        foundUser.avatar = null;
        foundUser.save();
      }
      const avatarRow = await this.avatarModel.findById(id);
      if (avatarRow?.url) {
        console.log(avatarRow?.url);
        if (fs.existsSync(avatarRow.url)) {
          return fs.unlink(avatarRow.url, (err) => {
            if (err) {
              return false;
            }
            avatarRow.updateOne({ url: '' });
            return true;
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
