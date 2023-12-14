import React, { useState } from 'react';
import { toast } from "react-toastify";

const ProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    image: '',
    size: '',
    model: '',
    description: '',
    price: '',
    stock: '',
    shipping: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};

    // Validación para 'image'
    if (!formData.image.trim()) {
      validationErrors.image = 'Formato url requerido';
    }

    // Validación para 'size'
    if (formData.size.length < 7){
      validationErrors.size = 'Debe contentener mínimo 7 caracteres, el tamaño: alto x ancho o valor de unidades';
    }

    // Validación para 'model'
    if (formData.model.length < 6)  {
      validationErrors.model = 'Debe contentener mínimo 6 caracteres';
    }

    // Validación para 'description'
    if (formData.description.length < 16) {
      validationErrors.description = 'Debe contentener mínimo 16 caracteres';
    }

    // Validación para 'price'
    if (!/^\$?\d{1,3}(?:\.\d{3})*$/gm.test(formData.price)) {
      validationErrors.price = 'Debe ser en un formato válido';
    }

    //Validación para 'stock'

    if (!/^\d+$/.test(formData.stock) || parseInt(formData.stock) <= 0) {
      validationErrors.stock = 'Debe ingresarse cantidad de stock, mínimo 1';
    }


    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0; // Devuelve true si no hay errores
  };

  // Para que se cargue el producto en la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        // Enviar datos a la API
        const response = await fetch('https://6568e66d9927836bd975957b.mockapi.io/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Si la respuesta es exitosa, agrega el producto a la lista
          const newProduct = await response.json();
          addProduct(newProduct);

          // Reinicia el formulario
          setFormData({
            image: '',
            size: '',
            model: '',
            description: '',
            price: '',
            stock: '0',
            shipping: false,
          });

          // Muestra un mensaje informativo con React Toastify solo si hace clic en "Agregar"
          toast.success('Producto agregado exitosamente');
        } else {
          console.error('Error al enviar datos a la API');
          // Muestra un mensaje de error con React Toastify solo si hace clic en "Agregar"
          toast.error('Error al agregar el producto');
        }
      } catch (error) {
        console.error('Error adding product', error);
        // Muestra un mensaje de error con React Toastify solo si hace clic en "Agregar"
        toast.error('Error al agregar el producto');
      }
    } else {
      // Muestra un mensaje de error con React Toastify solo si hace clic en "Agregar" y hay errores de validación
      toast.error('Error en la validación. No se puede agregar el producto');
    }
  };

  return (
    <section className='product-registration'>
      <h2>Datos del Producto</h2>
      <form className='form-product' onSubmit={handleSubmit}>
      <article className='form-product__group'>
          {/* Input para 'image' */}
          <label>
            Imagen
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            {errors.image && <p className='error-message'>{errors.image}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'size' */}
          <label>
            Tamaño
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
            {errors.size && <p className='error-message'>{errors.size}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'model' */}
          <label>
            Modelo
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
            {errors.model && <p className='error-message'>{errors.model}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'description' */}
          <label>
            Descripción
            <input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <p className='error-message'>{errors.description}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'price' */}
          <label>
            Precio
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            {errors.price && <p className='error-message'>{errors.price}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'stock' */}
          <label>
            Stock
            <input
              type="text"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
            {errors.stock && <p className='error-message'>{errors.stock}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Checkbox para 'envíos' */}
          <label>
            Envíos
            <input
              type="checkbox"
              checked={formData.shipping}
              onChange={(e) => setFormData({ ...formData, shipping: e.target.checked })}
            />
          </label>
        </article>
        <button className='form-product__btn' type="submit">Agregar</button>
      </form>
    </section>
  );
};

export default ProductForm;