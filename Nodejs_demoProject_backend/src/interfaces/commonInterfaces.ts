export const response: {
    
    message: string;
    data?: any;
    success: boolean;
    isActive: boolean;
  } = { message: "", success: false ,isActive:true};  

 // taskInterface.ts
 
export interface taskInterface extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  userId: TaskInterface; // Use the user interface here
}

// userInterface.ts


export interface TaskInterface extends Document {
  email: string;
  password: string;
  fullName: string;
  role: 'user' | 'admin';
}
