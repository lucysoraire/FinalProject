import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { getPatientInfo, userAuth } from '../../Redux/Actions/Actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Lógica de envío del formulario
    dispatch(userAuth(values));
    dispatch(getPatientInfo(values.email));
    navigate('/');
    setSubmitting(false);
  };

  return (
    <div className="containerLogin">
      <div className="messageLogin">
        <h1>¡Bienvenido a tu inicio de Sesión!</h1>
        <p>Regístrate y sé parte</p>
      </div>

      <div className="containerFormLogin">
        <p className="pprincipal">Iniciar Sesion</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="formLogin">
            <Field type="text" name="email" placeholder="Email" />

            <ErrorMessage name="email" component="div" className="error" />

            <Field type="password" name="password" placeholder="Contraseña" />

            <ErrorMessage name="password" component="div" className="error" />

            <button className="buttonLogin" type="submit">
              Iniciar Sesión
            </button>

            <p className="noAccount">¿Aún no tienes una cuenta?</p>

            <Link to="/register">
              <button className="buttonLogin" type="button">
                Registrarse
              </button>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
