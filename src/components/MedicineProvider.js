import { createContext, useState, useEffect } from "react";

export const MedicineContext = createContext();

const MedicineProvider = ({ children }) => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        // Fetch medicines from the API on component mount
        fetch("/api/medicines")
            .then((response) => response.json())
            .then((data) => setMedicines(data))
            .catch((error) => console.error("Error fetching medicines:", error));
    }, []);

    // Function to update medicine quantity in DB and locally
    const updateMedicineQuantity = async (id, updatedQuantity) => {
        try {
            // Update the quantity in the database
            await fetch(`/api/medicines/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: updatedQuantity }),
            });

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
        <MedicineContext.Provider value={{ medicines, updateMedicineQuantity }}>
            {children}
        </MedicineContext.Provider>
    );
};

export default MedicineProvider;
