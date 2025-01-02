import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
    // If there is a cached client and db, return them
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    // Create a new MongoClient instance if not already connected
    const client = new MongoClient(process.env.MONGODB_URI); // Use your MongoDB URI here
    await client.connect(); // Wait for the connection to be established

    // Cache the client and database instances
    cachedClient = client;
    cachedDb = client.db(); // Use the default database or specify the one you need

    return cachedDb;
};
