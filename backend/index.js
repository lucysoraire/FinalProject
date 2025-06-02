const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/routes/index"); // Aquí importás el router principal
const { sequelize } = require("./db");
const { encrypt } = require("./src/utils/passwordEncrypt");
const { User } = require("./db");
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
// Prefijo para todas las rutas
app.use("/fisiosport", router);

sequelize.sync({ alter: true }).then(async () => {
  // Usuario admin por defecto
  const admin = await User.findOne({ where: { email: "admin@gmail.com" } });
  if (!admin) {
    const passwordEncrypt = await encrypt("admin");
    await User.create({
      email: "admin@gmail.com",
      password: passwordEncrypt,
      isAdmin: true,
    });
  }
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
