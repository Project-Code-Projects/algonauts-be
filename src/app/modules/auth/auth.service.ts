import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { User } from '../users/user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { UserType } from '../users/user.interface';
import { Student } from '../students/student.model';
import { Instructor } from '../instructors/instructor.model';
import { Parent } from '../parents/parent.model';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // Find user by email
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new Error('Failed to find user');
  }

  // Check if the password matches
  if (password !== foundUser.password) {
    throw new Error('Password does not match');
  }

  const { _id, type } = foundUser;
  let userData = null;

  if (type === UserType.Student) {
    const student = await Student.findOne({ userId: _id });
    userData = {
      _id,
      type,
      studentId: student?._id,
    };
  } else if (type === UserType.Instructor) {
    const instructor = await Instructor.findOne({ userId: _id });
    userData = {
      _id,
      type,
      instructorId: instructor?._id,
    };
  } else if (type === UserType.Parent) {
    const parent = await Parent.findOne({ userId: _id });
    userData = {
      _id,
      type,
      parentId: parent?._id,
    };
  }

  const token = jwtHelpers.createToken(
    userData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, type },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    token,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
