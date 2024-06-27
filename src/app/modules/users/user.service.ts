/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IUser } from './user.interface';
import { User } from './user.model';
import { parentService } from '../parents/parent.service';
import { studentService } from '../students/student.service';
import { UserType } from './user.interface';
import { instructorService } from '../instructors/instructor.service';

const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = await User.create(userData);

  // await parentService.create({ userId: newUser._id });

  if (userData.type === UserType.Parent) {
    await parentService.create({
      // @ts-ignore
      userId: newUser._id,
    });
  } else if (userData.type === UserType.Student) {
    await studentService.create({
      // @ts-ignore

      userId: newUser._id,
      // @ts-ignore

      parentId: userData.parentId,
    });
  } else if (userData.type === UserType.Instructor) {
    // @ts-ignore

    await instructorService.create({ userId: newUser._id });
  }

  return newUser;
};

const updateUser = async (
  id: string,
  userData: Partial<IUser>,
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
  }).exec();
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id).exec();
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id).exec();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find().exec();
  return users;
};

const resetUserPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== oldPassword) {
    throw new Error('Old password is incorrect');
  }

  if (oldPassword === newPassword) {
    throw new Error('New password must be different from the old password');
  }

  user.password = newPassword;
  await user.save();

  return user;
};

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  resetUserPassword,
};
