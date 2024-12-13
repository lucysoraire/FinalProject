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

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
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
        <div className="containerLogin">
          <div className="containerFormLogin">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              <Form className="formLogin">
                <div className="fisio">
                  <h1>Bienvenido</h1>
                </div>
                <div className="field">
                  <div className="field-1">
                  <Field type='text' name='email' placeholder='Email' />
                  </div>
                  <div className="field-2">
                  <Field type='password' name='password' placeholder='Contraseña' />
                  </div>
                </div>

                <div className="buttonLogin">
                  <button type="submit">Registrarse</button>
                </div>

                <div className="new-account">
                  <p className="noAccount">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">Iniciar Sesión</Link>
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
