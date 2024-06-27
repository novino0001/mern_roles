import { ITask } from "./taskInterface"
import Task from "../../models/taskModel"
import { response } from '../../interfaces/commonInterfaces';
import User from "../../models/userModel";
import mongoose from "mongoose";


class TaskService {
 async createTask(userTask: ITask){
    try {
        const task = new Task(userTask)
        await task.save()
        if (task._id) {
            const taskInfo = {
                title: task.title,
                description: task.description,
                dewDate: task.dueDate,
                status: task.status
            };
            response.data = taskInfo;
            response.message = "Task created";
            response.success = true;
            return response;
        }

    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

async getTasks(user_id: string){
    try {
        const result = await Task.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(user_id) }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const getscore = result.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, { pending: 0, completed: 0 });

        const allTask = await Task.find({ userId: user_id });
        const response = {
            data: {
                allTask,
                getscore
            }
        };
       
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



  async getTaskById(id: string) {
    try {
        const getTask = await Task.findById({ _id: id });
        if (getTask) {
            response.message = "got task";
            response.success = true,
                response.data = { getTask }
            return response
        }

    }

    catch (error) {
        console.error("Error to find task:", error);
        throw error;
    }
}

 async updateTask(id: string, updates: Partial<ITask>) {
    try {
        const updated_task = await Task.findOneAndUpdate({ _id: id }, updates, { new: true });
        if (updated_task) {
            response.message = "task successfully updated";
            response.success = true,
                response.data = { updated_task }
            return response
        }

    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    }
}

 async deleteTask(id: string, userId: string)  {
    try {
        const deleted_task = await Task.findOneAndDelete({ _id: id, userId });
        if (deleted_task) {
            response.message = "task successfully deleted";
            response.success = true,
                response.data = { deleted_task }
            return response
        }
    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    };
}


async getUpcomingTask(id : string){
    
        const now = new Date();
        const oneWeekLater = new Date();
        oneWeekLater.setDate(now.getDate() + 7);
        try{
            const upcomingTasks = await Task.find({
                 userId : id,
                dueDate: {
                  $gte: now,
                  $lte: oneWeekLater
                },
                status: "pending"
              });
              console.log("------------------",upcomingTasks)
              if(upcomingTasks){
                 response.data = {upcomingTasks}
                 return response
  
            }
            else{
                response.message = "No upcoming task"
                return response
            }
        }
            catch (error) {
                console.error("Error find upcoming  task:", error);
                throw error;
            };     
       
    
}

// Admin service

 async particularUser(id: string) {
    try {
        const result = await Task.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(id) }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        console.log("--------->",result)

        const getscore = result.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, { pending: 0, completed: 0 });

        console.log("________getscore______",getscore)

        const userTask = await Task.find({ userId: id });
        const response = {
            data: {
                userTask,
                getscore
            }
        };
      
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

 async getAllTasks() {
    try {
        const results = await Task.aggregate([
            {
                $lookup: {
                    from: 'users', // Name of the User collection
                    localField: 'userId', // Field in Task collection
                    foreignField: '_id', // Field in User collection
                    as: 'userDetails', // Output array field
                },
            },
            {
                $unwind: '$userDetails', // Unwind the userDetails array
            },
            {
                $project: {
                    fullName: '$userDetails.fullName', // Select the fields you need
                    title: 1,
                    description: 1,
                    status: 1,
                    dueDate: 1,
                },
            },
        ]);
        const taskstatus = await Task.aggregate([
             
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        const getscore = taskstatus.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, { pending: 0, completed: 0 });
        
        if (results) {
            response.data = { results,getscore }
            return response
        }

    } catch (error) {
        console.error(error);
    }
};

 async adminDeleteTask(id: string) {
    try {
        const deleted_task = await Task.findOneAndDelete({ _id: id });
        if (deleted_task) {
            response.message = "task successfully deleted";
            response.success = true,
                response.data = { deleted_task }
            return response
        }
    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    };
};

 async adminUpdateTask(id: string, title: string, description: string, dewDate: Date, status: string) {
    try {
        const updates = {
            title: title,
            description: description,
            dewDate: dewDate,
            status: status
        };
        const updated_task = await Task.findOneAndUpdate({ _id: id }, updates, { new: true });
        if (updated_task) {
            response.message = "task successfully updated";
            response.success = true,
                response.data = { updated_task }
            return response
        }

    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    }
}

async createTaskByAdmin(userTask: ITask){
    try {
        const task = new Task(userTask)
        await task.save()
        if (task._id) {
            const taskInfo = {
                title: task.title,
                description: task.description,
                dewDate: task.dueDate,
                status: task.status
            };
            response.data = taskInfo;
            response.message = "Task created";
            response.success = true;
            return response;
        }

    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};
}
 
export default new TaskService();