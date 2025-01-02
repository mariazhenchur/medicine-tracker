// pages/_app.js
import React from 'react';
import MedicineProvider from '../context/MedicineContext';  
import '../styles/globals.css';  

function MyApp({ Component, pageProps }) {
  return (
    <MedicineProvider>
      <Component {...pageProps} />
    </MedicineProvider>
  );
}

export default MyApp;
