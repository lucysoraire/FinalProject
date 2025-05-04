require('dotenv').config();
const { Sequelize } = require('sequelize')
const UserModel = require('./src/models/usersModel')
const AppointmentModel = require('./src/models/appointmentModel')
const MedicalHistoryModel = require('./src/models/medicalHistoryModel')
const PatientModel = require('./src/models/patientModel')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}/${DB_DEPLOY}`,
    { logging: false, native: false })

UserModel(sequelize)
PatientModel(sequelize)
AppointmentModel(sequelize)
MedicalHistoryModel(sequelize)

const { User, Appointment, MedicalHistory, Patient } = sequelize.models;

module.exports = { ...sequelize.models, sequelize }