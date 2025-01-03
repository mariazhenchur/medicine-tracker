import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const HomePage = ({ medicines }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page-container">
      <h1 className="title">Medicine Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          marginLeft: "10px",
          padding: "8px",
          fontSize: "16px",
          width: "85%",
          maxWidth: "400px",
        }}
      />
      <div className="main-content">
        <ul>
          {filteredMedicines.map((medicine) => (
            <li className="list" key={medicine._id}>
              <img
                src={medicine.photo}
                alt={medicine.name}
                style={{ width: "50px", height: "50px" }}
              />
              <div className="text-container">
                <p className="paragraph">{medicine.name}</p>
                <p className="paragraph">{medicine.dose}</p>
                <p className="paragraph">{medicine.quantity} шт</p>
              </div>
              <div className="btns">
                <Link href={`/medicine/${medicine._id}`}>
                  <button className="button">Змінити</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button />
    </div>
  );
};

// Fetch medicines from MongoDB
export async function getServerSideProps() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'; // Fallback to local development if not deployed

  console.log('Fetching medicines from:', `${baseUrl}/api/medicines`); // Log the full API URL

  try {
    const res = await fetch(`${baseUrl}/api/medicines`);

    if (!res.ok) {
      console.error('Failed to fetch medicines:', res.statusText);
      return { props: { medicines: [] } }; // Return empty list if the fetch fails
    }

    const medicines = await res.json();

    console.log('Medicines fetched:', medicines); // Log the fetched medicines

    return { props: { medicines } };
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return { props: { medicines: [] } }; // Return empty list in case of error
  }
}


export default HomePage;

