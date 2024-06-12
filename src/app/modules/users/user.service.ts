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
      userId: newUser._id,
    });
  } else if (userData.type === UserType.Student) {
    await studentService.create({
      userId: newUser._id,
      parentId: userData.parentId,
    });
  } else if (userData.type === UserType.Instructor) {
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

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
