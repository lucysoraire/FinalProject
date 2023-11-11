const { Router } = require('express')
const userRouter = require('./usersRoute')
const patientRouter = require('./patientRoute')
const medicalHistoryRouter = require('./medicalHistoryRoute')

const router = Router()

router.use('/user', userRouter) 
router.use('/patient', patientRouter)
router.use('/history', medicalHistoryRouter)

module.exports = router