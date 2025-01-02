import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';

const handler = async (req, res) => {
    const db = await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const medicines = await db.collection('medicines').find({}).toArray();
            const medicinesWithStringId = medicines.map((medicine) => ({
                ...medicine,
                id: medicine._id.toString(), // Convert ObjectId to string
            }));

            return res.status(200).json(medicinesWithStringId);
        } catch (error) {
            console.error('Error fetching medicines:', error);
            return res.status(500).json({ error: 'Failed to fetch medicines' });
        }
    } else if (req.method === 'POST') {
        try {
            const { name, dose, quantity, photo } = req.body;

            const result = await db.collection('medicines').insertOne({
                name,
                dose,
                quantity,
                photo,
            });

            return res.status(201).json({
                id: result.insertedId.toString(),
                name,
                dose,
                quantity,
                photo,
            });
        } catch (error) {
            console.error('Error inserting medicine:', error);
            return res.status(500).json({ error: 'Error inserting medicine' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default handler;

