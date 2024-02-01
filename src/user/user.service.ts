import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findOne(id: string) {
    const isValidObjectId = Types.ObjectId.isValid(id);
    if (isValidObjectId) {
      const foundUser = this.userModel.findById(id);
      if (foundUser.exists('email', true)) {
        return foundUser;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }
}
