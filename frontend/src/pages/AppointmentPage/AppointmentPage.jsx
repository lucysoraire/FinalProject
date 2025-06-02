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
  const [disableAvailability, setDisableAvailability] = useState([]);
  const patientInfo = useSelector((state) => state.patientInfo);

  const today = new Date();

  const getPatientInfoFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const allPatients = JSON.parse(localStorage.getItem("patients")) || {};
    if (user?.email && allPatients[user.email]) {
      return allPatients[user.email];
    }
    return {};
  };

  const completePatientInfo =
    Object.keys(patientInfo).length === 0
      ? getPatientInfoFromLocalStorage()
      : patientInfo;

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

  const isDisabledDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return disableAvailability.some(
      (bloqueo) =>
        bloqueo.date === dateStr && (!bloqueo.hours || bloqueo.hours.length === 0)
    );
  };

  const isHourBlocked = (hour) => {
    if (!date) return false;
    const dateStr = date.toISOString().split("T")[0];
    return disableAvailability.some(
      (bloqueo) => bloqueo.date === dateStr && bloqueo.hours?.includes(hour)
    );
  };

const isHourFullyBooked = (hour) => {
  return disponibility.some(
    (item) => item.hour === hour && Number(item.count) >= 4
  );
};
  const horarios = [];
  for (let i = 14; i <= 17; i++) {
    horarios.push(`${i}:30`);
  }

  useEffect(() => {
    const fetchDisableAvailability = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/fisiosport/disable-availability"
        );
        setDisableAvailability(res.data);
      } catch (error) {
        console.error("Error al traer días/hora bloqueados", error);
      }
    };
    fetchDisableAvailability();
  }, []);

  const onChange = async (newDate) => {
    setDate(newDate);
    setHour("");
    try {
      const response = await axios.post(
        "http://localhost:3001/fisiosport/appointment/disponibility",
        { selectedDate: newDate }
      );
      setDisponibility(response.data);
    } catch (error) {
      console.error("Error al obtener disponibilidades:", error);
      setDisponibility([]);
    }
  };

  useEffect(() => {
    const checkPendingAppointment = async () => {
      if (!completePatientInfo?.id_patient) return;
      try {
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
      Swal.fire("Antes de solicitar un turno completa tus datos personales.");
      return;
    }

    if (date !== null && hour !== "") {
      try {
        const response = await axios.post(
          "http://localhost:3001/fisiosport/appointment",
          {
            date,
            hour,
            id_patient: completePatientInfo.id_patient,
          }
        );

        if (response.data.message) {
          const messageExtra = response.data.message;
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

        Swal.fire({ title: "Turno reservado", icon: "success" });
        setHasPendingAppointment(true);

        const storedAppointments =
          JSON.parse(localStorage.getItem("pendingAppointments")) || {};
        storedAppointments[completePatientInfo.id_patient] = { hasPending: true };
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
      if (!date && !hour) Swal.fire("Tienes que seleccionar una fecha y una hora.");
      else if (!hour) Swal.fire("Tienes que seleccionar una hora.");
      else Swal.fire("Tienes que seleccionar una fecha.");
    }
  };

  const cancelAppointment = () => {
    setDate(null);
    setHour("");
    setDisponibility([]);
  };

  return (
    <div className="containerAppointment">
      <div className="containerCalendarAndInfo">
        <div className="containerCalendar">
          <Calendar
            className="calendar"
            onChange={onChange}
            value={date}
            minDate={today}
            tileDisabled={({ date, view }) =>
              view === "month" &&
              (isWeekend(date) || date < today || isDisabledDate(date))
            }
          />
          <div className="containerTime">
            <div className="titleTime">
              <p className="horarios">Horarios</p>
            </div>
            <div className="containerHours">
              {horarios.map((horario, index) => {
                const isDisabled = isHourBlocked(horario) || isHourFullyBooked(horario);
                return (
                  <button
                    key={index}
                    className={`hours ${hour === horario ? "selected" : ""} ${
                      isDisabled ? "disabled-hour" : ""
                    }`}
                    onClick={() => !isDisabled && setHour(horario)}
                    disabled={isDisabled}
                  >
                    {horario}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="appointmentDetail">
          <p className="appointmentDetail-title">DETALLES DEL TURNO</p>
          <div className="containerDetail">
            <p>
              <b><span>Dirección:</span></b> Álvarez Condarco 1205
            </p>
            <p>
              <b><span>Teléfono:</span></b> 3816292005
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
                  <b><span>Fecha:</span></b> {date?.toLocaleDateString()}
                </p>
                <p>
                  <b><span>Hora:</span></b> {hour}
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
                <button className="button btnlogin" onClick={reserveAppointment}>
                  <span className="button-content">Confirmar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
