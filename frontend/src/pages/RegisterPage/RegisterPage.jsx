import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com'];
  const forbiddenPasswords = ['123456', '12345678', '123456789', 'abcdefg', 'password', 'contraseña'];
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('El correo electrónico es obligatorio')
      .min(10, 'El correo debe tener al menos 10 caracteres')
      .test(
        'domain-check',
        'Solo se permiten correos de Gmail, Hotmail u Outlook',
        value => {
          if (!value) return false;
          const email = value.toLowerCase();
          const domain = email.split('@')[1];
          return allowedDomains.includes(domain);
        }
      )
      .email('Correo electrónico no válido'),
  
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .test(
        'no-common-password',
        'La contraseña es demasiado simple',
        value => {
          if (!value) return false;
          const lower = value.toLowerCase();
          return !forbiddenPasswords.includes(lower);
        }
      )
  });
  

  const onSubmit = async (values) => {
    try {
      // Realizar la solicitud de registro utilizando axios
      console.log("hola");
      
      const response = await axios.post('http://localhost:3001/fisiosport/user/register', values);
      console.log(response.data); // Puedes manejar la respuesta según tus necesidades

      // Redirigir al usuario a la página de inicio de sesión después del registro
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
    }
  };

  return (
    <>
      <div className="container-de-todo-login">
        {/* Contenedor de la imagen */}
        <div className="containerImage2">

        </div>
        <div className="containerLogin">
          <div className="containerFormLogin">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
  <Form className="formLogin">
    <div className="fisio">
      <h1>REGISTRO</h1>
    </div>

    <div className="field">
      <div className="field-1">
        <Field type='text' name='email' placeholder='Email' />
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>
      <div className="field-2">
        <Field type='password' name='password' placeholder='Contraseña' />
        <ErrorMessage name="password" component="div" className="error-message" />
      </div>
    </div>

    <button className="button btnlogin" type="submit">
      <span className='button-content'>Crear cuenta</span>
    </button>

    <div className="new-account">
      <p className="noAccount">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  </Form>
</Formik>

          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
