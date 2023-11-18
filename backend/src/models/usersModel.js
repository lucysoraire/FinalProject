const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'User',
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    )
}