import { Schema } from 'mongoose';

interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: string;
  myList: Schema.Types.ObjectId[];
  ref: 'Content'; // Indicates that myList contains references to 'Content' model
  passwordChangeAt: number;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
}

export default IUser;