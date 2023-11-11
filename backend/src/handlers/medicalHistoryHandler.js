const { allMedicalHistories, createMedicalHistory, updateHistory, deleteHistory } = require("../controllers/medicalHistoryController")


const getMedicalHistory = async (req, res) => {
    try {
        const medicalHistories = await allMedicalHistories()
            res.status(200).json(medicalHistories)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const createNewMedicalHistory = async (req, res) => {
    try {
        const { diagnostic, notes, background, id_patient } = req.body
       
        const newMedicalHistory = await createMedicalHistory({diagnostic, notes, background, id_patient })
            res.status(200).json(newMedicalHistory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateMedicalHistory = async (req, res) => {
    try {
        const { historyId } = req.params
        const { data } = req.body 
        const medicalHistoryUpdated = await updateHistory(data, historyId)
            res.status(200).json(medicalHistoryUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteMedicalHistory = async (req, res) => {
    try {
        const { historyId } = req.params
        const medicalHistoryDeleted = await deleteHistory(historyId)
            res.status(200).json(medicalHistoryDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getMedicalHistory,
    createNewMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory
}