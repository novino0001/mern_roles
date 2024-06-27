export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    userId: string;
  }
 