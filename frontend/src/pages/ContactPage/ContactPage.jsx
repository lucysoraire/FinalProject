import './contactPage.css'; // Reutilizamos los estilos del login
import { useDispatch } from "react-redux";
import { sendContactMessage } from "../../Redux/Actions/Actions.js";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactPage = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    lastname: '',
    email: '',
    asunto: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().email("Correo inválido").required("El email es obligatorio"),
    asunto: Yup.string().required("Este campo no puede estar vacío"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const response = await dispatch(sendContactMessage(values));
    if (response.success) {
      alert("Mensaje enviado correctamente");
      resetForm();
    } else {
      alert("Hubo un error al enviar el mensaje");
    }
  };

  return (
    <div className="container-de-todo-login">
      {/* Imagen con info de contacto */}
      <div className="containerImage3">
        <div className="contact-overlay">
            <div>
          <h2>¿TENÉS UNA PREGUNTA?</h2>
          <p>No dudes en escribirnos si tenés alguna consulta, duda o simplemente querés saber más sobre nuestros servicios. Estamos acá para ayudarte. <br /><br />
          También podés comunicarte con nosotros a través de nuestras redes sociales, donde respondemos rápido y compartimos novedades, tips y contenido exclusivo.</p></div>
          <div className="social-icons">
            <a href="https://wa.me/5493816292005" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
              <span>+54 9 381 629 2005</span>
            </a>
            <a href="https://instagram.com/biomecanicatucuman" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              <span>@biomecanicatucuman</span>
            </a>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="containerLogin-contact">
        <div className="containerFormLogin">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="formLogin">
              <div className='frame'>
              <div className="fisio">
                <h1>CONTACTANOS</h1>
              </div>

              <div className="field-contact">
                <div className="field-1">
                  <Field type="text" name="name" placeholder="Nombre" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="field-1">
                  <Field type="text" name="lastname" placeholder="Apellido" />
                  <ErrorMessage name="lastname" component="div" className="error" />
                </div>
                <div className="field-1">
                  <Field type="email" name="email" placeholder="micorreo@gmail.com" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="field-1">
                  <Field type="text" as="textarea" name="asunto" placeholder="Hola, quisiera hacerte una consulta sobre..." />
                  <ErrorMessage name="asunto" component="div" className="error" />
                </div>
              </div>  
              </div>

              <button className="button btnlogin" type="submit">
                <span className='button-content'>Enviar</span>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
