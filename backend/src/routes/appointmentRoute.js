const { Router } = require("express");

const {
  getAllAppointments,
  getDisponibility,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientHandler,
} = require("../handlers/appointmentHandler");

const appointmentRouter = Router();

// Obtener todos los turnos
appointmentRouter.get("/all", getAllAppointments);

// Obtener turnos por ID de paciente
appointmentRouter.get("/patient/:id_patient", getAppointmentsByPatientHandler);

// Consultar disponibilidad por fecha
appointmentRouter.post("/disponibility", getDisponibility);

// Crear nuevo turno
appointmentRouter.post("/", createAppointment);

// Actualizar turno existente
appointmentRouter.put("/:appointmentId", updateAppointment);

// Eliminar turno
appointmentRouter.delete("/:appointmentId", deleteAppointment);

module.exports = appointmentRouter;
