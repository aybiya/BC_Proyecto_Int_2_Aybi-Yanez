// ContactForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    mail: '',
    cellphone: '',
    reason: '',
    writeMessage: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};
    const nameRegex = /^[A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]{3,10}$/gm;
    const lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ'’]{2,20}$/gm;
    const mailRegex = /\S+@\S+\.\S+/gm;
    const cellphoneRegex = /^\d{7,14}$/gm;
    const writeMessageRegex = /.{7,}/gm;

    // Validación para 'name'
    if (!nameRegex.test(formData.name)) {
      validationErrors.name = 'Nombre inválido, debe tener mínimo 3 y máximo 13 caracteres';
    }

    // Validación para 'lastName'
    if (!lastNameRegex.test(formData.lastName)) {
      validationErrors.lastName = 'Apellido inválido, debe tener mínimo 2 y máximo 20 caracteres';
    }

    // Validación para 'mail'
    if (!mailRegex.test(formData.mail)) {
      validationErrors.mail = 'Dirección inválida, ejemplo@mail.com';
    }

    // Validación para 'cellphone'
    if (!cellphoneRegex.test(formData.cellphone)) {
      validationErrors.cellphone = 'Número inválido, debe tener mínimo 7 y máximo 14 digitos';
    }

    // Validación para 'reason'
    if (!formData.reason) {
      validationErrors.reason = 'Elegir una razón';
    }

    // Validación para 'writeMessage'
    if (!writeMessageRegex.test(formData.writeMessage)) {
      validationErrors.writeMessage = 'Mensaje debe tener al menos 7 caracteres';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
        // Enviar el formulario si es válido
        // Aquí puedes agregar la lógica para enviar el formulario
        toast.success('Formulario enviado exitosamente');
    
        // Reiniciar los campos del formulario
        setFormData({
          name: '',
          lastName: '',
          mail: '',
          cellphone: '',
          reason: '',
          writeMessage: '',
        });
      } else {
        toast.error('Error en el formulario. Verifique los campos.');
      }
  };

  return (
    <section className='contact'>
        <h2>Consulta</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
            <section className='contact-form__info'>
                <div>
                    <article className="contact-form__group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </article>
                    <article className="contact-form__group">
                        <label htmlFor="mail">Correo Electrónio:</label>
                        <input
                        type="text"
                        id="mail"
                        value={formData.mail}
                        onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                        />
                        {errors.mail && <p className="error-message">{errors.mail}</p>}
                    </article>
                </div>
                <div>
                    <article className="contact-form__group">
                        <label htmlFor="lastName">Apellido:</label>
                        <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                    </article>
                    <article className="contact-form__group">
                        <label htmlFor="mail">Celular:</label>
                        <input
                        type="text"
                        id="cellphone"
                        value={formData.cellphone}
                        onChange={(e) => setFormData({ ...formData, cellphone: e.target.value })}
                        />
                        {errors.cellphone && <p className="error-message">{errors.cellphone}</p>}
                    </article>
                </div>
            </section>
            <article className="contact-form__reason">
                <label htmlFor="reason">Razón:</label>
                <select
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                >
                    <option value="">Seleccionar razón</option>
                    <option value="Fondos personalizados">Fondos personalizados</option>
                    <option value="Estado de envio">Estado de envio de mi producto</option>
                    <option value="Cancelar mi pedido">Cancelación de mi pedido</option>
                    <option value="Fondos por mayorista">Fondos por mayorista</option>
                    <option value="Otras consultas">Otras consultas</option>
                </select>
                {errors.reason && <p className="error-message">{errors.reason}</p>}
            </article>
            <article className="contact-form__message">
                <label htmlFor="writeMessage">Mensaje:</label>
                <textarea
                id="writeMessage"
                value={formData.writeMessage}
                onChange={(e) => setFormData({ ...formData, writeMessage: e.target.value })}
                />
                {errors.writeMessage && <p className="error-message">{errors.writeMessage}</p>}
            </article>
        <button type="submit">Enviar</button>
        </form>
    </section>
  );
};

export default ContactForm;
