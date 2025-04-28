import { useEffect, useState } from "react";
import "./PatientInfo.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  savePatientInfo,
  updatePatientInfo,
} from "../../Redux/Actions/Actions";

const getPatientInfoFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user')); // usuario logueado
  const allPatients = JSON.parse(localStorage.getItem('patients')) || {};

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
                precisa y actualizada.
              </p>

              <p className="textInfo">
                Tus datos serán tratados de forma confidencial y solo se usarán
                para brindarte un servicio personalizado, cumpliendo con las
                normativas de seguridad.
              </p>

              <p className="textInfo">
                Puedes actualizar tu información en cualquier momento desde la
                sección "Información Personal". Si necesitas modificar algo, estamos aquí
                para ayudarte.
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
                <span className='button-content'>Editar</span>
              </button>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="formInfo">
              <p className="datos-personales">DATOS PERSONALES</p>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="lastname"
                  value={formData?.lastname}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="number"
                  name="age"
                  value={formData?.age}
                  onChange={handleChange}
                  placeholder="Edad"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="dni"
                  value={formData?.dni}
                  onChange={handleChange}
                  placeholder="DNI"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="email"
                  name="email"
                  value={formData?.email}
                  readOnly={edit ? false : true} // Solo es 'readOnly' cuando no está en edición
                  disabled={edit ? true : false} // Deshabilita el campo solo si está en edición
                  className={edit ? "disabledInput" : ""}
                  placeholder="Correo"
                />
              </div>
              <div className="containerButtonSubmit">
              <button className="button btnlogin firstbutton">
                <span
                  className="buttonEditOrCancel button-content"
                  onClick={() => setEdit(false)}
                >
                  Cancelar
                </span>
                </button>
              <button className="button btnlogin" type="submit">
                <span className='button-content'>Guardar</span>
              </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
