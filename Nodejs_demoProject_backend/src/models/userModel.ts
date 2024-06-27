import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);
