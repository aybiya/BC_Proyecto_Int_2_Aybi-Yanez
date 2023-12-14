import React, { useState } from 'react';
import Header from './Header';
import ProductForm from './ProductForm';
import Footer from './Footer';

const ProductRegistration = () => {
  const [products, setProducts] = useState([]);

  // Función para agregar un producto a la lista
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };



  return (
    <>
      <h1>Alta de Producto</h1>
      <ProductForm addProduct={handleAddProduct} />
    </>
  );
};

export default ProductRegistration;