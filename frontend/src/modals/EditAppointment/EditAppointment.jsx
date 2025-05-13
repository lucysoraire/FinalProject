import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAppointment,
  updatePatientInfo,
} from "../../Redux/Actions/Actions";
import Calendar from "react-calendar";
import "./EditAppointment.css";
import Swal from "sweetalert2";

const EditAppointment = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { date: appointmentDate } = props?.appointment || {};
    if (appointmentDate) {
      const [day, month, year] = appointmentDate.split("/");
      const initialDate = new Date(year, month - 1, day);
      setDate(initialDate);
    }
  }, [props.appointment]);

  const [date, setDate] = useState(null);
  const [hour, setHour] = useState("");
  const [disponibility, setDisponibility] = useState([]);

  const today = new Date();

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

  const horarios = [];
  for (let i = 14; i <= 17; i++) {
    horarios.push(`${i}:30`);
  }

  const saveChanges = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro?",
        text: "Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Guardado!",
            text: "Los cambios fueron guardados.",
            icon: "success",
          });
          dispatch(
            updateAppointment(props.appointment.id_appointment, { date, hour })
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Los cambios no se guardaron.",
            icon: "error",
          });
        }
      });
  };

  const cancelAppointment = () => {
    setDate(null);
    setHour("");
    setDisponibility([]);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="containerHeaderModal"
        >
          Editar turno
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="containerBodyEditPatient">
        <div>
          <div className="containerInfoAppointmentPatient">
            <div>
              <label htmlFor="nombre">Paciente:</label>
              <p>
                {props?.appointment?.Patient?.name +
                  " " +
                  props?.appointment?.Patient?.lastname}
              </p>
            </div>

            <div>
              <label htmlFor="dni">DNI:</label>
              <p>{props?.appointment?.Patient?.dni}</p>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <p>{props?.appointment?.Patient?.email}</p>
            </div>
            <div>
              <label htmlFor="email">Telefono:</label>
              <p>{props?.appointment?.Patient?.phone}</p>
            </div>
          </div>
          <div className="containerModalCalendar">
            <div className="containerModalCalendar2">
              <Calendar
                className="calendar"
                onChange={onChange}
                value={date}
                minDate={today}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    if (isWeekend(date) || date < today) {
                      return "disabled";
                    }
                  }
                }}
              />
              <div className="containerTime">
                <div className="titleTime">
                  <p>Horarios</p>
                </div>
                <div className="containerHours">
                  {horarios.map((horario, index) => (
                    <button
                      className="hours"
                      key={index}
                      onClick={() => setHour(horario)}
                      disabled={
                        disponibility.some(
                          (item) =>
                            item.hour === horario && item.total_people === "4"
                        ) || !date
                      }
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="infoAppointmentModal">
              <p>
                <b>Fecha: </b>
                {date ? date.toLocaleDateString() : props?.appointment?.date}
              </p>
              <p>
                <b>Hora: </b>
                {hour ? hour : props?.appointment?.hour}
              </p>
              <button onClick={cancelAppointment} className="btn cancelarturno">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
        <Button onClick={saveChanges}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAppointment;
