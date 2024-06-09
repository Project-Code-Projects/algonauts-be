import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = await User.create(userData);
  return newUser;
};

export const UserService = {
  createUser,
};
