import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { MedicineContext } from '../../context/MedicineContext';

const MedicinePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { medicines, updateMedicineQuantity } = useContext(MedicineContext);

    const medicine = medicines.find((med) => med._id === id);

    if (!medicine) {
        return <div>Medicine not found</div>; // Early return outside Hooks
    }

    const [newQuantity, setNewQuantity] = useState(medicine.quantity);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/medicines/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Error saving medicine quantity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="info-container">
            <h1>{medicine.name}</h1>
            <img
                src={medicine.photo || 'default-image.jpg'} // Fallback for photo
                alt={`${medicine.name} photo`}
                style={{ width: '200px', height: '200px', marginBottom: '20px' }}
            />
            <p>Доза: {medicine.dose}</p>
            <p>Кількість:
                <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    min="0"
                    style={{ width: '60px', marginLeft: '10px' }}
                />
            </p>
            <button className="save" onClick={handleSave}>Зберегти</button>
            <button type="button" onClick={() => router.push('/')}>Назад</button>
        </div>
    );
};

export default MedicinePage;








