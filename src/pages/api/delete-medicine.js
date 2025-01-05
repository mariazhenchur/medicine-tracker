import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const deleteMedicine = async (id) => {
    try {
        await client.connect();
        const database = client.db('myDatabase'); // Replace with your database name
        const collection = database.collection('medicines');

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error deleting medicine:', error);
        throw new Error('Failed to delete medicine');
    } finally {
        await client.close();
    }
};

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const result = await deleteMedicine(id);

            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Medicine deleted successfully' });
            } else {
                res.status(404).json({ error: 'Medicine not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting medicine' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}