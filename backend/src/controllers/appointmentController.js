const { Appointment } = require('../../db')
const { Sequelize } = require('sequelize');

const allAppointments = async () => {

    const appointments = await Appointment.findAll({ order: [['id_appointment', 'ASC']] })
    return appointments
}

const getDisponibilityHour = async (selectedDate) => {
    console.log('llegue');
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