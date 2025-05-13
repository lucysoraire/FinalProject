const { MedicalHistory, Patient } = require("../../db");

const allMedicalHistories = async () => {
  const medicalHistories = await MedicalHistory.findAll({
    order: [["id_patient", "ASC"]],
    include: [{ model: Patient, as: "Patient" }],
  });
  return medicalHistories;
};

const medicalHistoryByPatientId = async (patientId) => {
  const medicalHistories = await MedicalHistory.findAll({
    where: { id_patient: patientId },
    include: [{ model: Patient, as: "Patient" }],
  });
  return medicalHistories;
};

const createMedicalHistory = async ({
  diagnostic,
  notes,
  background,
  id_patient,
  emergencyContact,
  medicationAllergies,
  currentMedications,
  previusInjuries,
  currentSymptoms,
}) => {
  const existingHistory = await MedicalHistory.findOne({
    where: { id_patient },
  });

  const data = {
    diagnostic,
    notes,
    background,
    id_patient,
    emergencyContact,
    medicationAllergies,
    currentMedications,
    previusInjuries,
    currentSymptoms,
  };

  if (!existingHistory) {
    console.log("Creando historial médico...");
    const medicalHistoryCreated = await MedicalHistory.create(data);
    return medicalHistoryCreated;
  } else {
    console.log("Actualizando historial médico...");
    return await updateHistory(data, existingHistory.id_medicalhistory);
  }
};

const updateHistory = async (data, historyId) => {
  const [rowsUpdated, [updatedMedicalHistory]] = await MedicalHistory.update(
    data,
    {
      where: { id_medicalhistory: historyId },
      returning: true,
    }
  );
  return rowsUpdated === 1 ? updatedMedicalHistory : null;
};

const deleteHistory = async (historyId) => {
  const dataDeleted = await MedicalHistory.destroy({
    where: { id_medicalhistory: historyId },
  });
  return dataDeleted;
};

module.exports = {
  allMedicalHistories,
  createMedicalHistory,
  updateHistory,
  deleteHistory,
  medicalHistoryByPatientId,
};
