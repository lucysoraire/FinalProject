const { Router } = require('express')
const { getMedicalHistory, createNewMedicalHistory, updateMedicalHistory, deleteMedicalHistory, getMedicalHistoryByPatient } = require('../handlers/medicalHistoryHandler')

const medicalHistoryRouter = Router()

medicalHistoryRouter.get('/', getMedicalHistory)
medicalHistoryRouter.get('/:patientId', getMedicalHistoryByPatient)
medicalHistoryRouter.post('/', createNewMedicalHistory)
medicalHistoryRouter.put('/:historyId', updateMedicalHistory)
medicalHistoryRouter.delete('/:historyId', deleteMedicalHistory)

module.exports = medicalHistoryRouter