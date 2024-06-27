import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import envConfig from './config/envConfig';
import  connectDB  from  "./config/database";

import authRoutes from "./features/auth/authRoute"
import taskRoutes from  "./features/task/taskRoute"
import userRoutes from './features/user/userRoutes';
 

const env = envConfig();

const port = env.port;

const app = express();
app.use(cors());
app.use(express.json());

// console.log(port)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/user',userRoutes)
 

app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port ${port}`);
  }
  );

 
