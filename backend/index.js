const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/routes/index");
const { sequelize } = require("./db");
const { encrypt } = require("./src/utils/passwordEncrypt");
const { User } = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

// Ruta principal
app.use("/fisiosport", router);

// Sincronización con la base de datos y creación de admin por defecto
sequelize.sync({ alter: true }).then(async () => {
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
