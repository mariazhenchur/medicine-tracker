import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { id } = req.query;

    console.log('API Request ID:', id);

    if (!ObjectId.isValid(id)) {
        console.error('Invalid ObjectId:', id);
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (req.method === 'PATCH') {
        try {
            const { quantity } = req.body;

            if (typeof quantity !== 'number' || quantity < 0) {
                console.error('Invalid quantity:', quantity);
                return res.status(400).json({ message: 'Invalid quantity' });
            }

            const db = await connectToDatabase();
            const result = await db.collection('medicines').updateOne(
                { _id: new ObjectId(id) },
                { $set: { quantity } }
            );

            if (result.modifiedCount === 0) {
                console.warn('No document modified:', id);
                return res.status(404).json({ message: 'Medicine not found or quantity unchanged' });
            }

            res.status(200).json({ message: 'Quantity updated successfully' });
        } catch (error) {
            console.error('Error updating medicine quantity:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PATCH']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

