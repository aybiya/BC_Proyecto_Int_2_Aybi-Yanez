import React, { useState, useEffect } from 'react';
import { CartProvider } from "./context/CartContext";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './Components/Home';
import Alta from './Components/Alta';
import Contacto from './Components/Contacto';
import Nosotros from './Components/Nosotros';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import CartModal from './Components/CartModal';


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

