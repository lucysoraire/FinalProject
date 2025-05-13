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

appointmentRouter.get("/all", getAllAppointments);
appointmentRouter.get("/patient/:id_patient", getAppointmentsByPatientHandler);
appointmentRouter.post("/disponibility", getDisponibility);
appointmentRouter.post("/", createAppointment);
appointmentRouter.put("/:appointmentId", updateAppointment);
appointmentRouter.delete("/:appointmentId", deleteAppointment);

module.exports = appointmentRouter;
