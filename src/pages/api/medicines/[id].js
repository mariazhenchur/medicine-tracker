import { MongoClient, ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

const handler = async (req, res) => {
    const { id } = req.query;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (req.method === 'PATCH') {
        try {
            const { quantity } = req.body;
            if (typeof quantity !== 'number' || quantity < 0) {
                return res.status(400).json({ message: 'Invalid quantity' });
            }

            // MongoDB connection
            const db = await connectToDatabase();
            const result = await db.collection('medicines').updateOne(
                { _id: new ObjectId(id) },
                { $set: { quantity } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Medicine not found or quantity unchanged' });
            }

            return res.status(200).json({ message: 'Quantity updated successfully' });
        } catch (error) {
            console.error('Error updating medicine quantity:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};

export default handler;
