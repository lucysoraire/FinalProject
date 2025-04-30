const { Router } = require('express');
const {
  getAllAppointments,
  getDisponibility,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientHandler // <-- nuevo import
} = require('../handlers/appointmentHandler');

const appointmentRouter = Router();

appointmentRouter.get('/all', getAllAppointments); // TODOS LOS TURNOS
appointmentRouter.get('/patient/:id_patient', getAppointmentsByPatientHandler); // 🔥 NUEVO: Turnos por paciente
appointmentRouter.post('/disponibility', getDisponibility); // DISPONIBILIDAD DE HORARIOS
appointmentRouter.post('/', createAppointment); // RESERVAR UN TURNO
appointmentRouter.put('/:appointmentId', updateAppointment); // ACTUALIZAR UN TURNO
appointmentRouter.delete('/:appointmentId', deleteAppointment); // ELIMINAR UN TURNO

module.exports = appointmentRouter;
