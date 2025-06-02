const { Router } = require('express');

const userRouter = require('./usersRoute'); // el archivo correcto: usersRoute.js
const patientRouter = require('./patientRoute');
const medicalHistoryRouter = require('./medicalHistoryRoute');
const appointmentRouter = require('./appointmentRoute');
const contactRouter = require('./contactRoute');

const router = Router();

// Aquí definís el prefijo para cada router
router.use('/user', userRouter);         // queda '/fisiosport/user'
router.use('/patient', patientRouter);
router.use('/history', medicalHistoryRouter);
router.use('/appointment', appointmentRouter);
router.use('/contact', contactRouter);

module.exports = router;
