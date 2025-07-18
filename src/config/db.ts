import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;