import { useEffect, useState } from "react";
import "./PatientInfo.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  savePatientInfo,
  updatePatientInfo,
} from "../../Redux/Actions/Actions";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras")
    .min(2, "Mínimo 2 caracteres")
    .max(30, "Máximo 30 caracteres")
    .required("El nombre es obligatorio"),

  lastname: Yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras")
    .min(2, "Mínimo 2 caracteres")
    .max(30, "Máximo 30 caracteres")
    .required("El apellido es obligatorio"),

  age: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "Edad mínima 0")
    .max(120, "Edad máxima 120")
    .required("La edad es obligatoria"),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(10, "Mínimo 10 dígitos")
    .max(13, "Máximo 13 dígitos")
    .required("El teléfono es obligatorio"),

  dni: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(7, "Mínimo 7 dígitos")
    .max(8, "Máximo 8 dígitos")
    .required("El DNI es obligatorio"),

  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
});

const getPatientInfoFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allPatients = JSON.parse(localStorage.getItem("patients")) || {};

  if (user?.email && allPatients[user.email]) {
    return allPatients[user.email];
  }

  return {};
};

const PatientInfo = () => {
  const dispatch = useDispatch();
  const patientInfo = useSelector((state) => state.patientInfo);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    dni: "",
    email: "",
    age: "",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      const allPatients = JSON.parse(localStorage.getItem("patients")) || {};
      if (allPatients[user.email]) {
        setFormData({ ...allPatients[user.email] });
      } else {
        setFormData({
          name: "",
          lastname: "",
          phone: "",
          dni: "",
          email: user.email,
          age: "",
        });
      }
    }
  }, [patientInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/fisiosport/patient",
        formData
      );
      dispatch(savePatientInfo(response.data));

      const allPatients = JSON.parse(localStorage.getItem("patients")) || {};
      allPatients[formData.email] = response.data;
      localStorage.setItem("patients", JSON.stringify(allPatients));

      setEdit(false);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const updatePatient = () => {
    dispatch(updatePatientInfo(patientInfo?.id_patient, formData));

    const allPatients = JSON.parse(localStorage.getItem("patients")) || {};
    allPatients[formData.email] = formData;
    localStorage.setItem("patients", JSON.stringify(allPatients));

    setEdit(false);
  };

  return (
    <div className="containerPatientInfo">
      <div className="textPatientInfo">
        <h2 className="titleInfo">INFORMACIÓN PERSONAL</h2>
        <div className="containerInfo">
          <p className="textInfo">
            Para reservar turnos, completa todos los campos con información
            precisa y actualizada dando click en "CARGAR INFORMACION".
          </p>

          <p className="textInfo">
            Una vez que hayas cargado tu información debes dirigirte a la sección "TURNOS" y reservarlo.
          </p>

          <p className="textInfo">
            Tus datos serán tratados de forma confidencial y solo se usarán para
            brindarte un servicio personalizado, cumpliendo con las normativas
            de seguridad.
          </p>

          <p className="textInfo">
            Puedes actualizar tu información en cualquier momento desde la
            sección "Información Personal". Si necesitas modificar algo, estamos
            aquí para ayudarte.
          </p>
        </div>
      </div>

      <div className="containerFormPatientInfo">
        <div className="formPatientInfo">
          {!edit ? (
            <div className="containerInfoPatient">
              <p className="titleInfoPatient">DATOS PERSONALES</p>
              <div className="patientInfoLoged">
                <p>
                  <b>Nombre: </b>
                  {formData?.name}
                </p>
                <p>
                  <b>Apellido: </b>
                  {formData?.lastname}
                </p>
                <p>
                  <b>Edad: </b>
                  {formData?.age}
                </p>
                <p>
                  <b>Telefono: </b>
                  {formData?.phone}
                </p>
                <p>
                  <b>DNI: </b>
                  {formData?.dni}
                </p>
                <p>
                  <b>Email: </b>
                  {formData?.email}
                </p>
              </div>
              <button className="button btnlogin" onClick={() => setEdit(true)}>
                <span className="button-content">Cargar Informacion</span>
              </button>
            </div>
          ) : (
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setFormData(values);
                handleSubmit({ preventDefault: () => {} });
              }}
            >
              {() => (
                <Form className="formInfo">
                  <p className="datos-personales">DATOS PERSONALES</p>

                  <div className="labelsAndInputs">
                    <Field name="name" placeholder="Nombre Completo" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="labelsAndInputs">
                    <Field name="lastname" placeholder="Apellido" />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="labelsAndInputs">
                    <Field name="age" type="number" placeholder="Edad" />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="labelsAndInputs">
                    <Field
                      name="phone"
                      placeholder="Teléfono (381635xxxx)"
                      inputMode="numeric"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="labelsAndInputs">
                    <Field name="dni" placeholder="DNI" inputMode="numeric" />
                    <ErrorMessage
                      name="dni"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="labelsAndInputs">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Correo"
                      disabled
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="containerButtonSubmit">
                    <button
                      className="button btnlogin firstbutton"
                      type="button"
                      onClick={() => setEdit(false)}
                    >
                      <span className="buttonEditOrCancel button-content">
                        Cancelar
                      </span>
                    </button>
                    <button className="button btnlogin" type="submit">
                      <span className="button-content">Guardar</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
