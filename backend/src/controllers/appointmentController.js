const { Appointment, Patient } = require("../../db");
const { Sequelize } = require("sequelize");
const moment = require("moment");

// Obtener todos los turnos
const allAppointments = async () => {
  const appointments = await Appointment.findAll({
    order: [["id_appointment", "ASC"]],
    include: [{ model: Patient, as: "Patient" }],
  });

  const appointmentsClean = appointments.map((appointment) => {
    const nuevoAppointment = { ...appointment.dataValues };

    const fechaOriginal = new Date(appointment.date);
    const dia = fechaOriginal.getDate();
    const mes = fechaOriginal.getMonth() + 1;
    const ano = fechaOriginal.getFullYear();
    nuevoAppointment.date = `${dia}/${mes}/${ano}`;

    if (appointment.Patient && appointment.Patient.createdAt) {
      const fechaOriginalPatient = new Date(appointment.Patient.createdAt);
      const diaPatient = fechaOriginalPatient.getDate();
      const mesPatient = fechaOriginalPatient.getMonth() + 1;
      const anoPatient = fechaOriginalPatient.getFullYear();
      nuevoAppointment.Patient.createdAt = `${diaPatient}/${mesPatient}/${anoPatient}`;
    }

    return nuevoAppointment;
  });

  return appointmentsClean;
};

// Obtener turno activo del paciente logueado
exports.getMyAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        patientId: req.user.id,
        status: "activo",
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: "No tienes un turno activo" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el turno", error });
  }
};

// Obtener todos los turnos de un paciente
const getAppointmentsByPatient = async (id_patient) => {
  const appointments = await Appointment.findAll({
    where: { id_patient },
    order: [["id_appointment", "ASC"]],
    include: [{ model: Patient, as: "Patient" }],
  });

  const appointmentsClean = appointments.map((appointment) => {
    const nuevoAppointment = { ...appointment.dataValues };

    const fechaOriginal = new Date(appointment.date);
    const dia = fechaOriginal.getDate();
    const mes = fechaOriginal.getMonth() + 1;
    const ano = fechaOriginal.getFullYear();
    nuevoAppointment.date = `${dia}/${mes}/${ano}`;

    if (appointment.Patient && appointment.Patient.createdAt) {
      const fechaOriginalPatient = new Date(appointment.Patient.createdAt);
      const diaPatient = fechaOriginalPatient.getDate();
      const mesPatient = fechaOriginalPatient.getMonth() + 1;
      const anoPatient = fechaOriginalPatient.getFullYear();
      nuevoAppointment.Patient.createdAt = `${diaPatient}/${mesPatient}/${anoPatient}`;
    }

    return nuevoAppointment;
  });

  return appointmentsClean;
};

// Obtener horarios ocupados para una fecha
const getDisponibilityHour = async (selectedDate) => {
  const turnosPorFecha = await Appointment.findAll({
    where: { date: selectedDate },
    attributes: [
      "hour",
      [Sequelize.fn("COUNT", Sequelize.col("hour")), "count"],
    ],
    group: ["hour"],
    raw: true,
  });

  return turnosPorFecha;
};

// Crear nuevo turno
const createNewAppointment = async (date, hour, id_patient) => {
  const existingPendingAppointment = await Appointment.findOne({
    where: {
      id_patient,
      date: { [Sequelize.Op.gte]: new Date() },
    },
  });

  if (existingPendingAppointment) {
    const appointmentDate = moment(existingPendingAppointment.date).format("D/M/YYYY");
    const appointmentHour = existingPendingAppointment.hour;

    return {
      message: `Ya tenés un turno pendiente para el ${appointmentDate} a las ${appointmentHour}. No podés reservar otro hasta ser atendido.`,
    };
  }

  const existingAppointmentsCount = await Appointment.count({
    where: { date, hour },
  });

  if (existingAppointmentsCount >= 4) {
    return {
      message: "Este horario ya está reservado. Elegí otro, por favor.",
    };
  }

  const appointmentsCreated = await Appointment.create({ date, hour, id_patient });
  return appointmentsCreated;
};

// Actualizar turno por ID
const updateAppointmentCtrl = async (data, appointmentId) => {
  if (data.hour === "") delete data.hour;
  if (data.date === "") delete data.date;

  const [rowsUpdated, [updatedAppointments]] = await Appointment.update(data, {
    where: { id_appointment: appointmentId },
    returning: true,
    include: [{ model: Patient, as: "Patient" }],
  });

  if (rowsUpdated === 1 && updatedAppointments) {
    const formattedDate = moment(updatedAppointments.date).format("D/M/YYYY");
    const patientData = await Patient.findByPk(updatedAppointments.id_patient);

    return {
      id_appointment: updatedAppointments.id_appointment,
      date: formattedDate,
      hour: updatedAppointments.hour,
      createdAt: updatedAppointments.createdAt,
      updatedAt: updatedAppointments.updatedAt,
      id_patient: updatedAppointments.id_patient,
      Patient: patientData.toJSON(),
    };
  } else {
    return null;
  }
};

// Eliminar turno por ID
const deleteAppointmentCtrl = async (appointmentId) => {
  const dataDeleted = await Appointment.destroy({
    where: { id_appointment: appointmentId },
    returning: true,
  });

  return dataDeleted;
};

// Actualizar turno activo del paciente logueado
exports.updateMyAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        patientId: req.user.id,
        status: "activo",
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: "No tienes un turno activo" });
    }

    const { date, time } = req.body;
    appointment.date = date;
    appointment.time = time;

    await appointment.save();

    res.json({ message: "Turno actualizado con éxito", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el turno", error });
  }
};

// Cancelar turno activo del paciente logueado
exports.cancelMyAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        patientId: req.user.id,
        status: "activo",
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: "No tienes un turno activo" });
    }

    appointment.status = "cancelado";
    await appointment.save();

    res.json({ message: "Turno cancelado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar el turno", error });
  }
};

// Exportar funciones internas
module.exports = {
  allAppointments,
  getAppointmentsByPatient,
  getDisponibilityHour,
  createNewAppointment,
  updateAppointmentCtrl,
  deleteAppointmentCtrl,
};
