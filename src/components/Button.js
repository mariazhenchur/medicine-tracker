// components/Button.js
import React from 'react';
import Link from 'next/link';

const Button = () => (
    <div className='footer-container'>
        <Link href="/add-medicine"> 
            <button className="add-medicine-btn">Додати ліки</button>
        </Link>
    </div>
);

export default Button;

