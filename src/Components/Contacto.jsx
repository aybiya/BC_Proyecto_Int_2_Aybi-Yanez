import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactForm from './ContactForm.jsx';

const Contacto = ({ openCartModal, addProduct, cartItems, updateQuantity, removeProduct }) => {
  const [products, setProducts] = useState([]);


  return (
    <>
      <Header
        openCartModal={openCartModal}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeProduct={removeProduct}
      />
      <h1>Formulario de contacto</h1>
      <ContactForm/>
      <Footer />
    </>
  );
}

export default Contacto;