import { Schema, model, Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export const User = model<UserInterface>('User', UserSchema);