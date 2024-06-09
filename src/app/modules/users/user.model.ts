import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserType = {
  Parent: 'parent',
  Student: 'student',
  Instructor: 'instructor',
};

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [UserType.Parent, UserType.Student, UserType.Instructor],
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('User', UserSchema);
