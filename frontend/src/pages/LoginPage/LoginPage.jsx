import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Verifica si el email está vacío
      if (!values.email.trim()) {
        alert("El correo electrónico es obligatorio.");
        setSubmitting(false);
        return;
      }
  
      // Realiza la solicitud al backend
      const response = await axios.post(
        `http://localhost:3001/fisiosport/user/login`,
        values
      );
  
      // Extrae los datos de la respuesta del servidor
      const userData = response.data;
  
      // Si el servidor no devuelve un usuario válido, muestra un error
      if (!userData.email) {
        alert("Error al iniciar sesión. Usuario no válido.");
        setSubmitting(false);
        return;
      }
  
      // Guarda los datos relevantes en el localStorage
      const user = {
        email: userData.email,
        authenticated: true,
        isAdmin: userData.isAdmin || false, // Asegúrate de que isAdmin venga del backend
      };
  
      localStorage.setItem("user", JSON.stringify(user));
  
      // Recarga la página o redirige después de iniciar sesión
      setSubmitting(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
      setSubmitting(false);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <>
      <div className="container-de-todo-login">
        {/* Contenedor de la imagen */}
        <div className="containerImage">

        </div>

        {/* Contenedor del formulario */}
        <div className="containerLogin">
          <div className="containerFormLogin">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="formLogin">
                <div className="fisio">
                  <h1>INICIAR SESIÓN</h1>
                </div>
                <div className="field">
                  <div className="field-1">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                  <div className="field-2">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      required
                    />
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>
                </div>

                <button className="button btnlogin" type="submit">
                  
                  <span className='button-content'>Ingresar</span>
                </button>

                <div className="new-account">
                  <p className="noAccount">
                    ¿Aún no tienes una cuenta?{" "}
                    <Link to="/register">Registrarse</Link>
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

export default LoginPage;
