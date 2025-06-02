//Se cambio todo para recibir el contacto del cliente

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMessageController = async (user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: "<practiceapplications0@gmail.com>",
    to: process.env.email,
    replyTo: user.email,
    subject: "Kinesiología - Nueva consulta",
    html: `
        <html>
        <body>
        <p><strong>Nombre del paciente:</strong> ${user.name} ${user.lastname}</p>
        <p><strong>Correo del paciente:</strong> ${user.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${user.asunto}</p>
        </body>
        </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = {
  sendMessageController,
};
