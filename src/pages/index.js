import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/medicines`);
    if (!res.ok) {
      return { props: { medicines: [] } };
    }
    const medicines = await res.json();
    return { props: { medicines } };
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return { props: { medicines: [] } };
  }
}

const HomePage = ({ medicines }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicineList, setMedicineList] = useState(medicines);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-medicine`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setMedicineList(medicineList.filter((medicine) => medicine._id !== id));
      } else {
        console.error('Failed to delete medicine:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const filteredMedicines = medicineList.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page-container">
      <h1 className="title">Medicine Tracker</h1>
      <input
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '20px',
          marginLeft: '10px',
          padding: '8px',
          fontSize: '16px',
          width: '85%',
          maxWidth: '400px',
        }}
      />
      <div className="main-content">
        <ul>
          {filteredMedicines.map((medicine) => (
            <li className="list" key={medicine._id}>
              <img
                src={medicine.photo}
                alt={medicine.name}
                style={{ width: '50px', height: '50px' }}
              />
              <div className="text-container">
                <p className="paragraph">{medicine.name}</p>
                <p className="paragraph">Доза: {medicine.dose}</p>
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

export default HomePage;

