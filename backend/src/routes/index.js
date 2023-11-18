const { Router } = require('express')
const userRouter = require('./usersRoute')
const patientRouter = require('./patientRoute')
const medicalHistoryRouter = require('./medicalHistoryRoute')
const appointmentRouter = require('./appointmentRoute')

const router = Router()

router.use('/user', userRouter) 
router.use('/patient', patientRouter)
router.use('/history', medicalHistoryRouter)
router.use('/appointment', appointmentRouter)

module.exports = router