import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      // Omit useNewUrlParser and useUnifiedTopology as they are default true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    // Assert the type of error to be an instance of Error
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      // Handle unexpected error types
      console.error('Unexpected error:', error);
    }
    process.exit(1);
  }
};

export default connectDB;