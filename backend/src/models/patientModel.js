const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PatientModel = sequelize.define("Patient", {
    id_patient: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  PatientModel.belongsTo(sequelize.models.User, { foreignKey: "email" });

  return PatientModel;
};
