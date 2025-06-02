import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    console.log("Token extraído de la URL:", token);
        const navigate = useNavigate();

    const initialValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La nueva contraseña es obligatoria"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
            .required("Confirmar contraseña es obligatorio"),
    });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    console.log("Token que se envía al backend:", token);

    await axios.post(`http://localhost:3001/fisiosport/user/reset-password/${token}`, {
      newPassword: values.newPassword,
    });

    alert("Contraseña restablecida con éxito.");
    resetForm();
    navigate("/login");
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    alert("El enlace es inválido o ha expirado.");
  } finally {
    setSubmitting(false);
  }
};
    return (
        <div className="container-de-todo-login-pass">
            <div className="containerLoginPass">
                <div className="containerFormLoginPass">
                    <div className="fisio">
                        <h1>RESTABLECER CONTRASEÑA</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="formLogin">
                            <div className="field fieldPass2">

                                <Field type="password" name="newPassword" placeholder="Nueva contraseña" />
                                <ErrorMessage name="newPassword" component="div" className="error" />
                            </div>
                            <div className="field fieldPass2">
                                <Field type="password" name="confirmPassword" placeholder="Confirmar contraseña" />
                                <ErrorMessage name="confirmPassword" component="div" className="error" />
                            </div>

                            <button className="button btnlogin" type="submit">
                                <span className="button-content">Restablecer</span>
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;