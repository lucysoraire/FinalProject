const {
  allAppointments,
  getAppointmentsByPatient,
  getDisponibilityHour,
  createNewAppointment,
  updateAppointmentCtrl,
  deleteAppointmentCtrl,
} = require("../controllers/appointmentController");

// Obtener todos los turnos
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await allAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener los turnos de un paciente específico
const getAppointmentsByPatientHandler = async (req, res) => {
  const { id_patient } = req.params;

  try {
    const appointments = await getAppointmentsByPatient(id_patient);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener disponibilidad por fecha
const getDisponibility = async (req, res) => {
  try {
    const { selectedDate } = req.body;
    const disponibility = await getDisponibilityHour(selectedDate);
    res.status(200).json(disponibility);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear un nuevo turno
const createAppointment = async (req, res) => {
  try {
    const { date, hour, id_patient } = req.body;
    const newAppointment = await createNewAppointment(date, hour, id_patient);

    if (newAppointment.message) {
      return res.status(400).json({ error: newAppointment.message });
    }

    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un turno existente
const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { data } = req.body;

    const appointmentUpdated = await updateAppointmentCtrl(data, appointmentId);
    res.status(200).json(appointmentUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un turno
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointmentDeleted = await deleteAppointmentCtrl(appointmentId);
    res.status(200).json(appointmentDeleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByPatientHandler,
  getDisponibility,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
