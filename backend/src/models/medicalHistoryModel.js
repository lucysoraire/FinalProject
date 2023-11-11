const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const MedicalHistoryModel = sequelize.define(
        'MedicalHistory',
        {
            id_medicalhistory: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            diagnostic: {
                type: DataTypes.STRING,
            },
            notes: {
                type: DataTypes.STRING
            },
            background: {
                type: DataTypes.STRING
            }
        }
    )

    MedicalHistoryModel.belongsTo(sequelize.models.Patient, {foreignKey: 'id_patient'}); // Establece la relación de clave foránea

    return MedicalHistoryModel;
}