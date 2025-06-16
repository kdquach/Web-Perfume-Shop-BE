import { UserInterface, UserResponse } from '../interfaces/user.interface';
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export const createUser = async (userData: UserInterface): Promise<UserResponse> => {
  const user = new User(userData);
  await user.save();
  const { password, ...userResponse } = user.toObject();
  return userResponse as unknown as UserResponse;
}

export const getUsers = async (): Promise<UserResponse[]> => {
  const users = await User.find().select('-password');
  return users as unknown as UserResponse[];
};

export const loginUser = async (email: string, password: string): Promise<UserResponse | null> => {
  const user = await User.findOne({ email });
  if(!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return null;

  const {password: pwd, ...userResponse } = user.toObject();
  return userResponse as unknown as UserResponse;
}
