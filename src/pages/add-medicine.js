// pages/add-medicine.js
import React, { useState } from "react";
import { useRouter } from "next/router";

const AddMedicinePage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        dose: "",
        quantity: "",
        photo: null,
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoPreview(reader.result);
                setForm({ ...form, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.dose || !form.quantity) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("/api/add-medicine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, quantity: parseInt(form.quantity, 10) }),
            });

            if (response.ok) {
                alert("Medicine added successfully!");
                router.push("/");  
            } else {
                alert("Failed to add medicine");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding medicine");
        }
    };

    return (
        <div className="add-container">
            <h1 className="title">Add Medication</h1>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Назва:
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="label">
                    Доза:
                    <input
                        className="input"
                        type="text"
                        name="dose"
                        value={form.dose}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="label">
                    Кількість:
                    <input
                        className="input"
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label className="label">
                    Фото:
                    <input
                        className="input"
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
                {photoPreview && (
                    <img src={photoPreview} alt="Preview" style={{ maxWidth: 100 }} />
                )}
                <br />
                <button type="submit" className="btn">Add Medicine</button>
            </form>
        </div>
    );
};

export default AddMedicinePage;
