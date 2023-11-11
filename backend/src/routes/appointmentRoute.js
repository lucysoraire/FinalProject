const { Router } = require('express')

const appointmentRouter = Router()

appointmentRouter.get('/allappointment', )   // TODOS LOS TURNOS
appointmentRouter.get('/disponibility')   // DISPONIBILIDAD DE HORARIOS SEGUN LA FECHA SELECCIONADA
appointmentRouter.post('/', )   // RESERVAR UN TURNO
appointmentRouter.put('/:appointmentId',)  // ACTUALIZAR UN TURNO
appointmentRouter.delete('/:appointmentId', )  // ELIMINAR UN TURNO

module.exports = appointmentRouter