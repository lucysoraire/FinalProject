const { Appointment, Patient } = require('../../db');
const { Sequelize } = require('sequelize');
const moment = require('moment');

const allAppointments = async () => {
    const appointments = await Appointment.findAll({
        order: [['id_appointment', 'ASC']],
        include: [
            {
                model: Patient,
                as: 'Patient'
            }
        ]
    });

    const appointmentsClean = appointments.map(appointment => {
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

const getAppointmentsByPatient = async (id_patient) => {
    const appointments = await Appointment.findAll({
        where: { id_patient },
        order: [['id_appointment', 'ASC']],
        include: [
            {
                model: Patient,
                as: 'Patient'
            }
        ]
    });

    const appointmentsClean = appointments.map(appointment => {
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

const getDisponibilityHour = async (selectedDate) => {
    const turnosPorFecha = await Appointment.findAll({
        where: { date: selectedDate },
        attributes: [
            'hour',
            [Sequelize.literal('COUNT(*)'), 'total_people']
        ],
        group: ['hour'],
    });

    return turnosPorFecha;
};

const createNewAppointment = async (date, hour, id_patient) => {
    const existingPendingAppointment = await Appointment.findOne({
        where: {
            id_patient,
            date: {
                [Sequelize.Op.gte]: new Date()
            }
        }
    });

    if (existingPendingAppointment) {
        return { message: 'Ya tenés un turno pendiente. No podés reservar otro hasta ser atendido.' };
    }

    const existingAppointmentsCount = await Appointment.count({
        where: { date, hour }
    });

    if (existingAppointmentsCount >= 4) {
        return { message: 'No se pueden agregar más citas para esta fecha y hora' };
    }

    const appointmentsCreated = await Appointment.create({
        date,
        hour,
        id_patient
    });

    return appointmentsCreated;
};

const updateAppointmentCtrl = async (data, appointmentId) => {
    if (data.hour === '') delete data.hour;
    if (data.date === '') delete data.date;

    const [rowsUpdated, [updatedAppointments]] = await Appointment.update(data, {
        where: { id_appointment: appointmentId },
        returning: true,
        include: [
            {
                model: Patient,
                as: 'Patient'
            }
        ]
    });

    if (rowsUpdated === 1 && updatedAppointments) {
        const formattedDate = moment(updatedAppointments.date).format('D/M/YYYY');
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

const deleteAppointmentCtrl = async (appointmentId) => {
    const dataDeleted = await Appointment.destroy({
        where: { id_appointment: appointmentId },
        returning: true
    });
    return dataDeleted;
};

module.exports = {
    allAppointments,
    getAppointmentsByPatient, // <-- nuevo
    getDisponibilityHour,
    createNewAppointment,
    updateAppointmentCtrl,
    deleteAppointmentCtrl
};
