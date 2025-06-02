const { Router } = require("express");

const userRouter = require("./usersRoute");
const patientRouter = require("./patientRoute");
const medicalHistoryRouter = require("./medicalHistoryRoute");
const appointmentRouter = require("./appointmentRoute");
const contactRouter = require("./contactRoute");
const disableAvailabilityRouter = require("./disableAvailabilityRoutes");

const router = Router();

// Rutas principales
router.use("/user", userRouter);
router.use("/patient", patientRouter);
router.use("/history", medicalHistoryRouter);
router.use("/appointment", appointmentRouter);
router.use("/contact", contactRouter);
router.use("/disable-availability", disableAvailabilityRouter);

module.exports = router;
