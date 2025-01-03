import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            // Connect to the database
            const client = await MongoClient.connect(process.env.MONGODB_URI2);
            const db = client.db();
            const medicinesCollection = db.collection("medicines");

            // Fetch medicines from the database
            const medicines = await medicinesCollection.find().toArray();

            // Convert ObjectId to string for each medicine
            const medicinesWithStringId = medicines.map((medicine) => ({
                ...medicine,
                id: medicine._id.toString(), // Convert ObjectId to string
            }));

            // Send the response with the medicines
            res.status(200).json(medicinesWithStringId);
            client.close();
        } catch (error) {
            console.error('Error fetching medicines:', error);
            res.status(500).json({ message: 'Error fetching medicines' }); // Return error if fetch fails
        }
    } else if (req.method === "POST") {
        try {
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
        } catch (error) {
            console.error('Error adding medicine:', error);
            res.status(500).json({ message: 'Error adding medicine' }); // Return error if POST fails
        }
    }
};

export default handler;
