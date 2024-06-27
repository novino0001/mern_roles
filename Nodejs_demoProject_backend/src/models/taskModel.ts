import mongoose, { Document, Schema } from 'mongoose';
import {ITask} from "../features/task/taskInterface"


const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ITask>('Task', TaskSchema);
