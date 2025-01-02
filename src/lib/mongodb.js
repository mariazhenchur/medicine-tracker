import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let isConnected = false;

export async function connectToDatabase() {
    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }
    const db = client.db('myDatabase'); // Replace with your DB name if needed
    return db;
}
