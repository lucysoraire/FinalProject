//se cambio todo para obtener los datos de contacto

const { sendMessageController } = require("../controllers/contactController");

const sendMessageHandler = async (req, res) => {
  try {
    const { data } = req.body;

    console.log("Datos recibidos en el backend:", data);

    if (!data || !data.name || !data.lastname || !data.email || !data.asunto) {
      return res
        .status(400)
        .json({ success: false, error: "Faltan datos en la solicitud" });
    }

    const messageSend = await sendMessageController(data);
    res
      .status(200)
      .json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error en sendMessageHandler:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  sendMessageHandler,
};
