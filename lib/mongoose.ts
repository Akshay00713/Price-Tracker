import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5000ms
      socketTimeoutMS: 45000, // Increase socket timeout to 45000ms
      connectTimeoutMS: 30000,      
    });

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
};
