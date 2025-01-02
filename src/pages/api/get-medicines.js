// api/get-medicines.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const getMedicines = async () => {
    try {
        await client.connect();
        const database = client.db("myDatabase");
        const collection = database.collection("medicines");

        const medicines = await collection.find({}).toArray();
        return medicines;
    } catch (error) {
        console.error("Error fetching medicines:", error);
        throw new Error("Failed to fetch medicines");
    } finally {
        await client.close();
    }
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const medicines = await getMedicines();
            res.status(200).json(medicines);
        } catch (error) {
            res.status(500).json({ error: "Error fetching data" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
