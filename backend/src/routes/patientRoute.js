const { Router } = require('express')
const { getAllPatients, createDataPatient, updateDataPatient, deleteDataPatient, getPatientById } = require('../handlers/patientHandler')

const patientRouter = Router()


patientRouter.get('/', getAllPatients)
patientRouter.get('/info/:userId', getPatientById)
patientRouter.post('/', createDataPatient)
patientRouter.put('/:patientId', updateDataPatient)
patientRouter.delete('/:patientId', deleteDataPatient)

module.exports = patientRouter