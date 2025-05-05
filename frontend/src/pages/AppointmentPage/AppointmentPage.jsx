import "./AppointmentPage.css";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AppointmentPage = () => {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState("");
  const [disponibility, setDisponibility] = useState([]);
  const [hasPendingAppointment, setHasPendingAppointment] = useState(false);

  const patientInfo = useSelector((state) => state.patientInfo);

  const today = new Date();

  // 🔥 CORRECCIÓN: función que recupera los datos de paciente de localStorage si Redux está vacío
  const getPatientInfoFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const allPatients = JSON.parse(localStorage.getItem("patients")) || {};

    if (user?.email && allPatients[user.email]) {
      return allPatients[user.email];
    }

    return {};
  };

  // Usar datos de Redux o LocalStorage según disponibilidad
  const completePatientInfo =
    Object.keys(patientInfo).length === 0
      ? getPatientInfoFromLocalStorage()
      : patientInfo;

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

  const onChange = async (newDate) => {
    setDate(newDate);
    const response = await axios.post(
      "http://localhost:3001/fisiosport/appointment/disponibility",
      {
        selectedDate: newDate,
      }
    );
    setDisponibility(response.data);
  };

  useEffect(() => {
    const checkPendingAppointment = async () => {
      try {
        if (!completePatientInfo?.id_patient) return;

        const response = await axios.get(
          `http://localhost:3001/fisiosport/appointment/patient/${completePatientInfo.id_patient}`
        );

        const now = new Date();
        const hasPending = response.data.some((app) => {
          const [day, month, year] = app.date.split("/");
          const appointmentDate = new Date(`${year}-${month}-${day}T00:00:00`);
          return appointmentDate >= now;
        });

        setHasPendingAppointment(hasPending);

        const storedAppointments =
          JSON.parse(localStorage.getItem("pendingAppointments")) || {};
        storedAppointments[completePatientInfo.id_patient] = { hasPending };
        localStorage.setItem(
          "pendingAppointments",
          JSON.stringify(storedAppointments)
        );
      } catch (error) {
        console.error("Error al verificar turno pendiente:", error);
      }
    };

    checkPendingAppointment();
  }, [completePatientInfo]);

  const horarios = [];
  for (let i = 14; i <= 17; i++) {
    horarios.push(`${i < 10 ? "0" + i : i}:30`);
  }

  // const horarios2 = [];
  // for (let j = 16; j <= 19; j++) {
  //   horarios2.push(`${j < 10 ? "0" + j : j}:00`);
  // }

  const reserveAppointment = async () => {
    if (
      !completePatientInfo.id_patient ||
      !completePatientInfo.email ||
      !completePatientInfo.dni ||
      !completePatientInfo.age ||
      !completePatientInfo.lastname ||
      !completePatientInfo.name ||
      !completePatientInfo.phone
    ) {
      Swal.fire("Tienes que ingresar tu información personal completa!");
      return;
    }

    if (date !== null && hour !== "") {
      try {
        const response = await axios.post(
          "http://localhost:3001/fisiosport/appointment",
          {
            date,
            hour,
            id_patient: completePatientInfo?.id_patient,
          }
        );

        if (response.data.message) {
          const messageExtra = response.data.message;

          // Verificar si hay un turno pendiente y mostrar la fecha y hora
          if (response.data.appointment) {
            const appointment = response.data.appointment;
            const messageWithAppointment = `${messageExtra} Tu turno pendiente es el ${appointment.date} a las ${appointment.hour}.`;
            Swal.fire({
              title: "Atención",
              text: messageWithAppointment,
              icon: "warning",
            });
          } else {
            Swal.fire({
              title: "Atención",
              text: messageExtra,
              icon: "warning",
            });
          }

          return;
        }

        Swal.fire({
          title: "Turno reservado",
  
          icon: "success",
        });

        setHasPendingAppointment(true);

        const storedAppointments =
          JSON.parse(localStorage.getItem("pendingAppointments")) || {};
        storedAppointments[completePatientInfo.id_patient] = {
          hasPending: true,
        };
        localStorage.setItem(
          "pendingAppointments",
          JSON.stringify(storedAppointments)
        );
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.error || "Algo salió mal",
          "error"
        );
      }
    } else {
      if (date === null && hour === "")
        Swal.fire("Tienes que seleccionar una fecha y una hora!");
      else if (hour === "") Swal.fire("Tienes que seleccionar una hora!");
      else Swal.fire("Tienes que seleccionar una fecha!");
    }
  };

  const cancelAppointment = () => {
    setDate(null);
    setHour("");
    setDisponibility([]);
  };

  return (
    <div className="containerAppointment">
      {/* MUESTRA LA FECHA Y HORARIOS SELECCIONADOS */}
      <div className="containerCalendarAndInfo">
        {/* CONTENEDOR DEL CALENDARIO Y HORARIOS */}
        <div className="containerCalendar">
          <Calendar
            className="calendar"
            onChange={onChange}
            value={date}
            minDate={today}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                if (isWeekend(date) || date < today) {
                  return "disabled"; // Agrega la clase 'disabled' a los días deshabilitados
                }
              }
            }}
          />
          <div className="containerTime">
            <div className="titleTime">
              <p className="horarios">Horarios</p>
            </div>
            <div className="containerHours">
              {[...horarios].map((horario, index) => (
                <button
                className={`hours ${hour === horario ? "selected" : ""} ${
                  disponibility.some((item) => item.hour === horario) ? "disabled-hour" : ""
                }`}
                
                  key={index}
                  onClick={() => setHour(horario)}
                  disabled={
                    disponibility.some((item) => item.hour === horario) || !date
                  }
                >
                  {horario}
                </button>
              ))}
            </div>
          </div>
        </div>
        {
          <div className="appointmentDetail">
          <p className="appointmentDetail-title">DETALLES DEL TURNO</p>
          <div className="containerDetail">
            <p>
              <b><span>Direccion:</span></b> Álvarez Condarco 1205
            </p>
            <p>
              <b><span>Telefono:</span></b> 3816292005
            </p>
            <p>
              <b><span>Email:</span></b> biomecanicatucuman@gmail.com
            </p>
        
            {hasPendingAppointment ? (
              <p className="turno-confirmado">
                <b>Turno reservado:</b> {date?.toLocaleDateString()} a las {hour}
              </p>
            ) : (
              <>
                <p>
                  <b><span>Fecha:</span></b> {date && date.toLocaleDateString()}
                </p>
                <p>
                  <b><span>Hora:</span></b> {date && hour}
                </p>
              </>
            )}
          </div>
        
          <div className="containerButtonsCalendar">
            {!hasPendingAppointment && (
              <>
                <button
                  className="button btnlogin firstbutton"
                  onClick={cancelAppointment}
                >
                  <span className="button-content">Cancelar</span>
                </button>
                <button
                  className="button btnlogin"
                  onClick={reserveAppointment}
                >
                  <span className="button-content">Confirmar</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        }
      </div>
      {/* CONTENEDOR BOTONES PARA RESERVAR O CANCELAR EL TURNO */}
    </div>
  );
};

export default AppointmentPage;
