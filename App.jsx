import React, { useState, useEffect } from 'react';
import { CartProvider } from "./src/context/CartContext";
import { Routes, Route } from 'react-router-dom';
import './src/sApp.css';
import Home from './src/Components/Home';
import Alta from './src/Components/Alta';
import Contacto from './src/Components/Contacto';
import Nosotros from './src/Components/Nosotros';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './src/Components/Header';
import CartModal from './src/Components/CartModal';


const App = () => {
  

  return (
    <>
      <CartProvider>
        <Header
        />
        <CartModal
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alta" element={<Alta />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </>
  );
};

export default App;

