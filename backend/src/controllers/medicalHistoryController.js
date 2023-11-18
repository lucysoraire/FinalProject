const { MedicalHistory, Patient } = require('../../db')

const allMedicalHistories = async () => {
    const medicalHistories = await MedicalHistory.findAll(
        {
            order: [['id_patient', 'ASC']],
            include: [{
                model: Patient,
                as: 'Patient'
            }]
        }
    )
    return medicalHistories
}

const createMedicalHistory = async ({ diagnostic, notes, background, id_patient }) => {
    const medicalHistoryCreated = await MedicalHistory.create({
        diagnostic,
        notes,
        background,
        id_patient
    })
    return medicalHistoryCreated
}

const updateHistory = async (data, historyId) => {
    const [rowsUpdated, [updatedMedicalHistory]] = await MedicalHistory.update(data, { where: { id_medicalhistory: historyId }, returning: true })
    if (rowsUpdated === 1 && updatedMedicalHistory) {
        return updatedMedicalHistory
    } else {
        return null;
    }
}

const deleteHistory = async (historyId) => {
    const dataDeleted = await MedicalHistory.destroy({ where: { id_medicalhistory: historyId }, returning: true })
    return dataDeleted
}

module.exports = {
    allMedicalHistories,
    createMedicalHistory,
    updateHistory,
    deleteHistory
}