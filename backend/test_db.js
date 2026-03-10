import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is missing in .env');
    process.exit(1);
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB!');
        await mongoose.connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Connection Failed:', err);
    }
};

connect();
