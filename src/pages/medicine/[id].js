import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { MedicineContext } from '../../context/MedicineContext';
import { CircularProgress } from '@mui/material';

const MedicinePage = () => {
    
    const router = useRouter();
    const { id } = router.query;
    const { medicines } = useContext(MedicineContext);

    const medicine = medicines.find((med) => med._id === id);

    if (!medicine) {
        return <div className='circle'><CircularProgress /></div>;
    }

    const [quantityDelta, setQuantityDelta] = useState("");

    const handleUpdateQuantity = async (delta) => {
        const newQuantity = medicine.quantity + delta;

        if (newQuantity < 0) {
            alert("Кількість не може бути менше 0!");
            return;
        }

        try {
            const response = await fetch(`/api/medicines/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delta }),
            });

            if (response.ok) {
                router.reload(); // Reload to reflect updated data
            } else {
                console.error('Error updating medicine quantity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="info-container">
            <h1>{medicine.name}</h1>
            <img
                src={medicine.photo || 'default-image.jpg'}
                alt={`${medicine.name} photo`}
                style={{ width: '200px', height: '200px', marginBottom: '20px' }}
            />
            <p>Доза: {medicine.dose}</p>
            <p>Кількість: {medicine.quantity} шт</p>
            <input className='input'
                type="number"
                value={quantityDelta}
                onChange={(e) => setQuantityDelta(e.target.value)}
                placeholder="Enter quantity"
                style={{ width: '250px', margin: '10px 0' }}
            />
            <div>
                <button
                    className="button-add"
                    onClick={() => handleUpdateQuantity(Number(quantityDelta))}
                >
                    Додати
                </button>
                <button
                    className="button-take"
                    onClick={() => handleUpdateQuantity(-Number(quantityDelta))}
                >
                    Відняти
                </button>
            </div>
            <button className='button-back' onClick={() => router.push('/')}>
                Назад
            </button>
        </div>
    );
};

export default MedicinePage;










