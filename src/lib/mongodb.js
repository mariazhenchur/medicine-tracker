import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
    // If there is a cached client and db, return them
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    // Create a new MongoClient instance with connection options
    const client = new MongoClient(process.env.MONGODB_URI2, {
        useNewUrlParser: true,  // To parse the connection string correctly
        useUnifiedTopology: true,  // To ensure the connection is made using the newer topology engine
        ssl: true,  // Ensure SSL is enabled
        tls: true,  // Force TLS
        tlsAllowInvalidCertificates: false,  // Disallow invalid certificates for production
    });

    // Wait for the connection to be established
    await client.connect();

    // Cache the client and database instances
    cachedClient = client;
    cachedDb = client.db();  // Use the default database or specify the one you need

    return cachedDb;
};
