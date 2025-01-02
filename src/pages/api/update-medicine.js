// pages/api/update-medicine.js
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const { id, delta } = req.body; // ID and the quantity change

        try {
            // Update the medicine in the database (for example, using MongoDB)
            const updatedMedicine = await MedicineModel.findByIdAndUpdate(id, {
                $inc: { quantity: delta }, // Increment or decrement the quantity
            }, { new: true });

            res.status(200).json(updatedMedicine);  // Return the updated medicine
        } catch (error) {
            res.status(500).json({ error: 'Failed to update medicine quantity' });
        }
    }
}
