import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const Mongo_Url = process.env.MONGO_URL;

// Validate MongoDB URL
if (!Mongo_Url) {
  console.error('❌ MongoDB Connection Error: MONGO_URL environment variable is not defined');
  console.error('Please check your .env file and ensure MONGO_URL is properly set');
  process.exit(1);
}

console.log('MongoDB URL:', Mongo_Url ? 'Configured ✅' : 'Missing ❌');

mongoose
  .connect(Mongo_Url)
  .then(() => {
    console.log('✅ MongoDB Connected successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Please check your MongoDB connection string and network connectivity');
    process.exit(1);
  });
