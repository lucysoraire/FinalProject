import { useEffect, useState } from "react";
import "./PatientInfo.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  savePatientInfo,
  updatePatientInfo,
} from "../../Redux/Actions/Actions";

const PatientInfo = () => {
  const dispatch = useDispatch();

  const patientInfo = useSelector((state) => state.patientInfo);
  useEffect(() => {
    setFormData({
      name: patientInfo?.name,
      lastname: patientInfo?.lastname,
      phone: patientInfo?.phone,
      dni: patientInfo?.dni,
      email: patientInfo?.email,
      age: patientInfo?.age,
    });
  }, [patientInfo]);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    dni: "",
    email: "",
    age: "",
  });
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Enviar los datos al backend
      const response = await axios.post(
        "http://localhost:3001/fisiosport/patient",
        formData
      );
      console.log("Respuesta del backend:", response.data);
  
      // Guardar los datos en Redux
      dispatch(savePatientInfo(response.data));
  
      // Guardar los datos en localStorage para persistencia
      localStorage.setItem('patientInfo', JSON.stringify(response.data));
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  useEffect(() => {
    // Primero, revisamos si hay datos en Redux
    if (patientInfo && Object.keys(patientInfo).length > 0) {
      setFormData({
        name: patientInfo?.name,
        lastname: patientInfo?.lastname,
        phone: patientInfo?.phone,
        dni: patientInfo?.dni,
        email: patientInfo?.email,
        age: patientInfo?.age,
      });
    } else {
      // Si no hay datos en Redux, buscamos en localStorage
      const storedPatientInfo = localStorage.getItem('patientInfo');
      if (storedPatientInfo) {
        const parsedPatientInfo = JSON.parse(storedPatientInfo);
        // Si hay datos en localStorage, cargamos los datos en el estado del formulario
        setFormData({
          name: parsedPatientInfo?.name || '',
          lastname: parsedPatientInfo?.lastname || '',
          phone: parsedPatientInfo?.phone || '',
          dni: parsedPatientInfo?.dni || '',
          email: parsedPatientInfo?.email || '',
          age: parsedPatientInfo?.age || '',
        });
      }
    }
  }, [patientInfo]);

  const updatePatient = () => {
    // Actualizar los datos en Redux
    dispatch(updatePatientInfo(patientInfo?.id_patient, formData));
    
    // Guardar los datos actualizados en localStorage
    localStorage.setItem('patientInfo', JSON.stringify(formData));
  
    // Desactivar el modo de edición
    setEdit(false);
  };
  
  return (
    <div className="containerPatientInfo">
      <div className="textPatientInfo">
        <h2>Información y Privacidad</h2>
        <div className="containerInfo">
          <ul>
            <li>
              <p>
                Para poder reservar turnos, es necesario completar todos los
                campos de información personal. Asegúrate de proporcionar
                información precisa y actualizada.
              </p>
            </li>
            <li>
              <p>
                La información personal que proporcionas será tratada de manera
                confidencial y se utilizará únicamente con el propósito de
                brindarte un servicio personalizado. Nos comprometemos a
                proteger tu privacidad y a cumplir con las regulaciones de
                seguridad de datos.
              </p>
            </li>
            <li>
              <p>
                Recuerda que tus datos personales son flexibles. Puedes
                actualizar tu información en cualquier momento accediendo a tu
                cuenta y visitando la sección de "Mis Datos". Si necesitas
                ajustar la fecha, hora u otra información personal, estamos aquí
                para facilitar ese proceso. Tu comodidad es nuestra prioridad.
              </p>
            </li>
          </ul>
        </div>
      </div>
  
      <div className="containerFormPatientInfo">
        <div className="formPatientInfo">
          {/* Si no se tiene la información, se muestra el formulario */}
          {!patientInfo?.email && !localStorage.getItem('patientInfo') ? (
            <form onSubmit={handleSubmit} className="formInfo">
              <p>Datos Personales</p>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData?.lastname}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData?.age}
                  onChange={handleChange}
                  placeholder="Edad"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="text"
                  name="dni"
                  id="dni"
                  value={formData?.dni}
                  onChange={handleChange}
                  placeholder="Dni"
                />
              </div>
              <div className="labelsAndInputs">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Correo"
                />
              </div>
              <div className="containerButtonSubmit">
                <button type="submit">Guardar</button>
              </div>
            </form>
          ) : (
            <div className="containerInfoPatient">
              <p className="titleInfoPatient">Datos Personales</p>
              {/* Si no está en modo edición, mostrar los datos del paciente */}
              {!edit ? (
                <div className="patientInfoLoged">
                  <p>
                    <b>Nombre: </b>
                    {patientInfo?.name || JSON.parse(localStorage.getItem('patientInfo'))?.name}
                  </p>
                  <p>
                    <b>Apellido: </b>
                    {patientInfo?.lastname || JSON.parse(localStorage.getItem('patientInfo'))?.lastname}
                  </p>
                  <p>
                    <b>Edad: </b>
                    {patientInfo?.age || JSON.parse(localStorage.getItem('patientInfo'))?.age}
                  </p>
                  <p>
                    <b>Telefono: </b>
                    {patientInfo?.phone || JSON.parse(localStorage.getItem('patientInfo'))?.phone}
                  </p>
                  <p>
                    <b>DNI: </b>
                    {patientInfo?.dni || JSON.parse(localStorage.getItem('patientInfo'))?.dni}
                  </p>
                  <p>
                    <b>Email: </b>
                    {patientInfo?.email || JSON.parse(localStorage.getItem('patientInfo'))?.email}
                  </p>
                </div>
              ) : (
                <div className="labelsAndInputsLoged">
                  <input
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={formData?.lastname}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="age"
                    value={formData?.age}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="dni"
                    value={formData?.dni}
                    onChange={handleChange}
                  />
                  <div className="containerButtonSubmit">
                    <button onClick={updatePatient}>Guardar</button>
                  </div>
                </div>
              )}
  
              <button
                className="buttonEditOrCancel"
                onClick={() => setEdit(!edit)}
              >
                {edit ? "Cancelar" : "Editar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default PatientInfo;
