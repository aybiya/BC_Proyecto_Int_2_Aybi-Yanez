import React, { useState } from 'react';
import Header from './Header';
import ProductForm from './ProductForm';
import Footer from './Footer';

const Alta = ({ openCartModal, cartItems, updateQuantity, removeProduct }) => {
  const [products, setProducts] = useState([]);

  // Función para agregar un producto a la lista
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };



  return (
    <>
      <Header 
        openCartModal={openCartModal}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeProduct={removeProduct}
      />
      <h1>Alta de Producto</h1>
      <ProductForm addProduct={handleAddProduct} />
      <Footer />
    </>
  );
};

export default Alta;