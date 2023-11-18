const { Appointment, Patient } = require('../../db')
const { Sequelize } = require('sequelize');

const allAppointments = async () => {

    const appointments = await Appointment.findAll(
        {
            order: [['id_appointment', 'ASC']],
            include: [
                {
                    model: Patient,
                    as: 'Patient'
                }
            ]
        }
    )
    const appointmentsClean = appointments.map(appointment => {
        // Copiar el objeto original
        const nuevoAppointment = { ...appointment.dataValues };

        // Convertir la fecha en el objeto principal
        const fechaOriginal = new Date(appointment.date);
        const dia = fechaOriginal.getDate();
        const mes = fechaOriginal.getMonth() + 1;
        const ano = fechaOriginal.getFullYear();
        nuevoAppointment.date = `${dia}/${mes}/${ano}`;

        // Convertir la fecha en el objeto "Patient"
        if (appointment.Patient && appointment.Patient.createdAt) {
            const fechaOriginalPatient = new Date(appointment.Patient.createdAt);
            const diaPatient = fechaOriginalPatient.getDate();
            const mesPatient = fechaOriginalPatient.getMonth() + 1;
            const anoPatient = fechaOriginalPatient.getFullYear();
            nuevoAppointment.Patient.createdAt = `${diaPatient}/${mesPatient}/${anoPatient}`;
        }

        return nuevoAppointment;
    });

    return appointmentsClean
}

const getDisponibilityHour = async (selectedDate) => {
    const turnosPorFecha = await Appointment.findAll({
        where: {
            date: selectedDate,
            // Otras condiciones si es necesario
        },
        attributes: [
            'hour',
            [Sequelize.literal('COUNT(*)'), 'total_people']
        ],
        group: ['hour'],
    });

    return turnosPorFecha
}

const createNewAppointment = async (date, hour, id_patient) => {

    const existingAppointmentsCount = await Appointment.count({
        where: {
            date,
            hour,
        }
    });

    if (existingAppointmentsCount >= 4) {
        return { message: 'No se pueden agregar más citas para esta fecha y hora' };
    }

    const appointmentsCreated = await Appointment.create({
        date,
        hour,
        id_patient
    })
    return appointmentsCreated
}

const updateAppointmentCtrl = async (data, appointmentId) => {
    const [rowsUpdated, [updatedAppointments]] = await Appointment.update(data, { where: { id_appointment: appointmentId }, returning: true })
    if (rowsUpdated === 1 && updatedAppointments) {
        return updatedAppointments
    } else {
        return null;
    }
}

const deleteAppointmentCtrl = async (appointmentId) => {
    const dataDeleted = await Appointment.destroy({ where: { id_appointment: appointmentId }, returning: true })
    return dataDeleted
}

module.exports = {
    allAppointments,
    getDisponibilityHour,
    createNewAppointment,
    updateAppointmentCtrl,
    deleteAppointmentCtrl
}