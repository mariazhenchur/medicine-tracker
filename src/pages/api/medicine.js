import { MongoClient } from 'mongodb';

// Connection URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const insertMedicine = async (medicine) => {
    try {
        await client.connect();
        const database = client.db("myDatabase"); // You can name your database here
        const collection = database.collection("medicines"); // Name of the collection

        const result = await collection.insertOne(medicine);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to insert medicine");
    } finally {
        await client.close();
    }
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const medicine = req.body;
            const result = await insertMedicine(medicine);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error inserting data" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
