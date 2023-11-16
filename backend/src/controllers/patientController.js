const { Patient, User } = require('../../db')

const allPatients = async () => {
    const patients = await Patient.findAll({ order: [['id_patient', 'ASC']] })
    return patients
}

const getPatient = async (userId) => {
    const patient = await Patient.findOne({
        where: { email: userId }
    });
    console.log(patient);
    return patient;
};

const createData = async ({ name, lastname, phone, dni, email }) => {
    const dataCreated = await Patient.create({
        name,
        lastname,
        phone,
        dni,
        email
    })
    console.log(createData);
    return dataCreated 
}

const updateData = async (patient, patientId) => {
    const [rowsUpdated, [updatedData]] = await Patient.update(patient, { where: { id_patient: patientId }, returning: true })
    if (rowsUpdated === 1 && updatedData) {
        return updatedData
    } else {
        return null;
    }
}

const deleteData = async (patientId) => {
    const dataDeleted = await Patient.destroy({where: {id_patient: patientId}, returning: true})
    return dataDeleted
}

module.exports = {
    allPatients,
    createData,
    updateData,
    deleteData,
    getPatient
}