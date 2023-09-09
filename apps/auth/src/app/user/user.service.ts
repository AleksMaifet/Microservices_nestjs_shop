import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccountRegister } from '@shop/contracts';
import { UserRole } from '@shop/interfaces';
import { compare, genSalt, hash } from 'bcrypt';
import { UserModel } from './user.model';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  async createUser(dto: AccountRegister.Dto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
      role: UserRole.User,
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async deleteUser(email: string) {
    await this.userModel.deleteOne({ email }).exec();
  }
}
