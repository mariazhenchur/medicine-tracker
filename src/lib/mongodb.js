import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    if (!client.isConnected()) {
        await client.connect();
    }

    cachedClient = client;
    cachedDb = client.db();

    return cachedDb;
};

