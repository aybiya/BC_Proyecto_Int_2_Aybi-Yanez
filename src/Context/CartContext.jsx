import React, { createContext, useState, useEffect } from 'react';
import { toast } from "react-toastify";
export const CartContext = createContext();

  const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  // Cargar carrito desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedCart = localStorage.getItem('cartInfo');
    if (storedCart !== null && storedCart !== undefined) {
      try {
        const { cartItems, selectedQuantities } = JSON.parse(storedCart);
        setCartItems(cartItems);
        setSelectedQuantities(selectedQuantities);
      } catch (error) {
        console.error('Error al analizar la cadena JSON:', error);
      }
    }
  }, []);

  // Actualizar localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('cartInfo', JSON.stringify({ cartItems, selectedQuantities }));
  }, [cartItems, selectedQuantities]);

  // Guardar la información del carrito antes de que la página se recargue
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('cartInfo', JSON.stringify({ cartItems, selectedQuantities }));
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems, selectedQuantities]);
  
  // agregar productos al carrito
  const addToCart = (product, selectedQuantity) => {
    const { id, stock } = product;
  
    setCartItems((prevItems) => {
      // Buscar si el producto ya está en el carrito
      const existingProductIndex = prevItems.findIndex((item) => item.id === id);
  
      if (existingProductIndex !== -1) {
        const existingProduct = prevItems[existingProductIndex];
        const newQuantity = existingProduct.quantity + selectedQuantity;
  
        // Actualizar la cantidad del producto en el carrito
        const updatedCart = [...prevItems];
        updatedCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };
  
        // Actualizar selectedQuantities
        setSelectedQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: newQuantity,
        }));
  
        return updatedCart;
      } else {
        // Agregar el nuevo producto al carrito
        setSelectedQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: selectedQuantity,
        }));
  
        return [...prevItems, { ...product, quantity: selectedQuantity }];
      }
    });
  
    toast.success(`Producto ${product.model} ${product.size} agregado al carrito`);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

  };


  const decrementQuantity = (productId) => {
    setSelectedQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const selectedQuantity = updatedQuantities[productId];
      if (selectedQuantity > 1) {
        updatedQuantities[productId] = selectedQuantity - 1;
      } else {
        delete updatedQuantities[productId];
      }
      return updatedQuantities;
    });
  };
  
  const removeProduct = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        // Restar la cantidad seleccionada al eliminar el producto
        setSelectedQuantities((prevQuantities) => {
          const updatedQuantities = { ...prevQuantities };
          const selectedQuantity = updatedQuantities[productId];
          if (selectedQuantity > 1) {
            updatedQuantities[productId] = selectedQuantity - 1;
          } else {
            // Si la cantidad es 1, eliminar la entrada en selectedQuantities
            delete updatedQuantities[productId];
          }
          return updatedQuantities;
        });
  
        // Si la cantidad es 1, eliminar el producto del carrito
        if (item.quantity === 1) {
          return null; // Retorna null para indicar que el producto debe eliminarse
        }
  
        // Restar 1 a la cantidad del producto
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
  
    // Filtrar los productos con cantidad mayor a 0 antes de actualizar el carrito
    const filteredCartItems = updatedCartItems.filter(Boolean);
  
    setCartItems(filteredCartItems);
    localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
    toast.success('Producto eliminado', filteredCartItems);
  };
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeProduct, 
        isCartModalOpen, 
        openCartModal, 
        closeCartModal, 
        selectedQuantities 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
