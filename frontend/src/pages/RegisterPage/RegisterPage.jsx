import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
  const forbiddenPasswords = [
    "123456",
    "12345678",
    "123456789",
    "abcdefg",
    "password",
    "contraseña",
  ];

  const validationSchema = Yup.object({
 email: Yup.string()
  .required("El correo electrónico es obligatorio")
  .min(10, "El correo debe tener al menos 10 caracteres")
  .email("Correo electrónico no válido")
  .test(
    "domain-check",
    "Solo se permiten correos de Gmail, Hotmail u Outlook",
    (value) => {
      if (!value) return false;
      const domain = value.toLowerCase().split("@")[1];
      return allowedDomains.includes(domain);
    }
  )
  .test(
    "unique-email",
    "El correo ya está registrado",
    async (value) => {
      if (!value) return false;
      try {
        const res = await axios.get(
          `http://localhost:3001/fisiosport/user/exists?email=${value}`
        );
        return !res.data.exists;
      } catch (err) {
        console.error("Error validando email:", err);
        return false; // en caso de error, prevenir el registro
      }
    }
  ),

  });

  const onSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      // Verificar si el email ya existe
      const check = await axios.get(
        `http://localhost:3001/fisiosport/user/exists?email=${values.email}`
      );

      if (check.data.exists) {
        setFieldError("email", "Ya existe una cuenta con este correo");
        setSubmitting(false);
        return;
      }

      // Si no existe, registramos normalmente
      const response = await axios.post(
        "http://localhost:3001/fisiosport/user/register",
        values
      );

      console.log("Usuario registrado:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-de-todo-login">
        <div className="containerImage2"></div>
        <div className="containerLogin">
          <div className="containerFormLogin">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="formLogin">
                <div className="fisio">
                  <h1>REGISTRO</h1>
                </div>

                <div className="field">
                  <div className="field-1">
                    <Field type="text" name="email" placeholder="Email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="field-2">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <button className="button btnlogin" type="submit">
                  <span className="button-content">Crear cuenta</span>
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
