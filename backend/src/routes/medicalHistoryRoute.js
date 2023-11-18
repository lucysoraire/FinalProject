const { Router } = require('express')
const { getMedicalHistory, createNewMedicalHistory, updateMedicalHistory, deleteMedicalHistory } = require('../handlers/medicalHistoryHandler')

const medicalHistoryRouter = Router()

medicalHistoryRouter.get('/', getMedicalHistory)
medicalHistoryRouter.post('/', createNewMedicalHistory)
medicalHistoryRouter.put('/:historyId', updateMedicalHistory)
medicalHistoryRouter.delete('/:historyId', deleteMedicalHistory)

module.exports = medicalHistoryRouter