import mongoose from 'mongoose';

const mongoURL = 'mongodb://127.0.0.1:27017/demo-database';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;