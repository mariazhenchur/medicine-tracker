import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { id } = req.query;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (req.method === 'PATCH') {
        try {
            const { delta } = req.body;

            if (typeof delta !== 'number' || delta === 0) {
                return res.status(400).json({ message: 'Invalid quantity change' });
            }

            const db = await connectToDatabase();
            const medicine = await db.collection('medicines').findOne({ _id: new ObjectId(id) });

            if (!medicine) {
                return res.status(404).json({ message: 'Medicine not found' });
            }

            const newQuantity = medicine.quantity + delta;

            if (newQuantity < 0) {
                return res.status(400).json({ message: "Quantity can't go below zero" });
            }

            const result = await db.collection('medicines').updateOne(
                { _id: new ObjectId(id) },
                { $inc: { quantity: delta } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Medicine not updated' });
            }

            res.status(200).json({ message: 'Quantity updated successfully' });
        } catch (error) {
            console.error('Error updating medicine quantity:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
