import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser, UserRole } from '@shop/interfaces';

@Schema()
export class UserModel extends Document implements IUser {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.User,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
