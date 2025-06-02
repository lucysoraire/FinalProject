const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DisableAvailability = sequelize.define("DisableAvailability", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: {
      type: DataTypes.DATEONLY, // fecha inicio (sin hora)
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY, // fecha fin (si es el mismo día, entonces es solo 1 día)
      allowNull: false,
    },
    disableFullDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    startHour: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    endHour: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    // Podés agregar relación a usuario o paciente si querés
  });

  return DisableAvailability;
};
