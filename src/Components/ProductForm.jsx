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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    // Implementa las validaciones específicas para cada campo
    switch (fieldName) {
        case 'image':
            // Validación de URL
            error = value.trim() && isValidUrl(value) ? '' : 'Formato url requerido';
            break;
          case 'size':
            // Validación de tamaño con expresión regular
            error = value.trim() && /^\d{2,3}x\d{2,3}cm$/.test(value) ? '' : 'Formato correcto: alto x ancho, al menos 7 caracteres.';
            break;
          case 'model':
            // Validación de modelo con expresión regular
            error = value.trim() && /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{6,}$/.test(value) ? '' : 'Debe tener al menos 6 caracteres y solo letras';
            break;
          case 'description':
            // Validación de descripción con longitud mínima
            error = value.trim().length >= 16 ? '' : 'Debe tener al menos 16 caracteres';
            break;
          case 'price':
            // Validación de precio con expresión regular
            error = value.trim() && /^\$?\d{1,3}(?:\.\d{3})*$/.test(value) && parseInt(value, 10) >= 1 ? '' : 'El precio debe ser mayor a 0';
            break;
            case 'stock':
            // Validación de precio con expresión regular
            error = /^\d+$/.test(value) && parseInt(value, 10) >= 1 ? '' : 'Valor mínimo 1';
            break;
          default:
            break;
        }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};


    for (const [fieldName, value] of Object.entries(formData)) {
      validateField(fieldName, value);

      if (errors[fieldName]) {
        newErrors[fieldName] = errors[fieldName];
      }
    }

    setErrors(newErrors);

    // Verifica si hay errores y si todos los campos están completos
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    const isFormComplete = Object.values(formData).every((value) => value !== '');

    if (hasErrors) {
      toast.error('Completar los campos de manera correcta');
      return false;
    }

    if (!isFormComplete) {
      toast.error('Completar todos los datos');
      return false;
    }

    return true;
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
            stock: '',
            shipping: false,
          });

          toast.success('Producto agregado exitosamente!');
        } 
      } catch (error) {
        console.error('Error adding product', error);
        toast.error('Error al agregar el producto');
      }
    } 
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddProductBtn = () => {
    const isValid = validateForm();

    if (isValid) {
      // Realiza la acción correspondiente al hacer clic en el botón de agregar
      console.log('Agregando producto al carrito...');
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
              name="image"
              value={formData.image}
              onChange={handleChange}
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
              name="size"
              value={formData.size}
              onChange={handleChange}
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
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            {errors.model && <p className='error-message'>{errors.model}</p>}
          </label>
        </article>
        <article className='form-product__group'>
          {/* Input para 'description' */}
          <label>
            Descripción
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              name="price"
              value={formData.price}
              onChange={handleChange}
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
              name="stock"
              value={formData.stock}
              onChange={handleChange}
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
              name="shipping"
              checked={formData.shipping}
              onChange={handleChange}
            />
          </label>
        </article>
        <button className='form-product__btn' type="submit" onClick={handleAddProductBtn}>Agregar</button>
      </form>
    </section>
  );
};

export default ProductForm;