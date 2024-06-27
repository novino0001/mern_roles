 
export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;  
    status: 'pending' | 'completed';
    userId: string;
  }
  export interface Performance {
    pending: number;
    completed: number;
  }
  