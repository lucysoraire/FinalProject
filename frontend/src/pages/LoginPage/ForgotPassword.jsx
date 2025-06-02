import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginPage.css"; 

const ForgotPasswordPage = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("http://localhost:3001/fisiosport/user/forgot-password", values);
      alert("Si el correo está registrado, se enviará un enlace de recuperación.");
      resetForm();
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      alert("Ocurrió un error al procesar tu solicitud.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-de-todo-login-pass">
      <div className="containerLoginPass">
        <div className="containerFormLoginPass">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="formLogin">
              <div className="fisio">
                <h1>RECUPERAR CONTRASEÑA</h1>
              </div>
              <div className="field fieldPass">
                <Field
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <button className="button btnlogin" type="submit">
                <span className="button-content">Enviar enlace</span>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;