import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "GET") {
        // Fetch medicines from the database
        const client = await MongoClient.connect(process.env.MONGODB_URI2);
        const db = client.db();
        const medicinesCollection = db.collection("medicines");
        const medicines = await medicinesCollection.find().toArray();

        // Convert ObjectId to string for each medicine
        const medicinesWithStringId = medicines.map((medicine) => ({
            ...medicine,
            id: medicine._id.toString(), // Convert ObjectId to string
        }));

        res.status(200).json(medicinesWithStringId);
        client.close();
    } else if (req.method === "POST") {
        // Add a new medicine to the database
        const { name, dose, quantity, photo } = req.body;
        const client = await MongoClient.connect(process.env.MONGODB_URI2);
        const db = client.db();
        const medicinesCollection = db.collection("medicines");

        const result = await medicinesCollection.insertOne({
            name,
            dose,
            quantity,
            photo,
        });

        // Respond with the added medicine
        res.status(201).json({
            id: result.insertedId.toString(), // Convert ObjectId to string
            name,
            dose,
            quantity,
            photo,
        });

        client.close();
    }
};

export default handler;