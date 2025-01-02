// context/MedicineContext.js
import { createContext, useState, useEffect } from "react";

export const MedicineContext = createContext();

const MedicineProvider = ({ children }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        // Fetch medicines from the API on component mount
        fetch("/api/medicines")
            .then((response) => response.json())
            .then((data) => {
                setMedicines(data);
                setLoading(false); // Set loading to false after fetching data
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function to update medicine quantity in DB and locally
    const updateMedicineQuantity = async (id, updatedQuantity) => {
        try {
            // Update the quantity in the database
            const response = await fetch(`/api/medicines/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: updatedQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            // Update the local state
            setMedicines((prevMedicines) =>
                prevMedicines.map((medicine) =>
                    medicine._id === id
                        ? { ...medicine, quantity: updatedQuantity }
                        : medicine
                )
            );
        } catch (error) {
            console.error('Error updating medicine quantity:', error);
        }
    };

    return (
        <MedicineContext.Provider value={{ medicines, updateMedicineQuantity, loading, error }}>
            {children}
        </MedicineContext.Provider>
    );
};

export default MedicineProvider;
