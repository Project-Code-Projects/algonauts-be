import { Model , } from 'mongoose';

/* eslint-disable no-unused-vars */
export enum UserType {
  Parent = 'parent',
  Student = 'student',
  Instructor = 'instructor',
}

export interface IUser  {
  name: string;
  type: UserType;
  avatar: string;
  email: string;
  password: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
