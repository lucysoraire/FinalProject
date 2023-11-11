const { allPatients, createData, updateData, deleteData } = require("../controllers/patientController")

const getAllPatients = async (req, res) => {
    try {
        const patients = await allPatients()
            res.status(200).json(patients)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const createDataPatient = async (req, res) => {
    try {
        const { name, lastname, phone, dni, email } = req.body
        console.log(name, email);
        const dataCreated = await createData({name, lastname, phone, dni, email})
            res.status(200).json(dataCreated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateDataPatient = async (req, res) => {
    try {
        const { patientId } = req.params
        const { patient } = req.body 
        const dataUpdated = await updateData(patient, patientId)
            res.status(200).json(dataUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteDataPatient = async (req, res) => {
    try {
        const { patientId } = req.params
        const dataDeleted = await deleteData(patientId)
            res.status(200).json(dataDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPatients,
    createDataPatient,
    updateDataPatient,
    deleteDataPatient
}