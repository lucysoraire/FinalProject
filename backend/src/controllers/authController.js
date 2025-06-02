const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { User } = require('../../db');
const { Op } = require('sequelize');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("🔔 [forgotPassword] Petición recibida para:", email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiration = new Date(Date.now() + 3600000); // 1 hora

    user.reset_token = token;
    user.reset_token_expiration = expiration;
    await user.save();
    console.log("✅ Token guardado para:", email, " Token:", token);

    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey', 
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("📨 Transporter verificado, listo para enviar.");
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const resetLink = `${FRONTEND_URL}/reset-password/${token}`;
    console.log("🔗 Link generado:", resetLink);

    const info = await transporter.sendMail({
      from: 'biomecanicatucuman@gmail.com', // debe estar verificado en SendGrid
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña. Este enlace expira en 1 hora.</p>`,
    });

    console.log("✅ Correo enviado:", info.messageId || info.response);

    res.json({ message: 'Correo enviado con el enlace de recuperación.' });
  } catch (error) {
    console.error('❌ Error en forgotPassword:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log("🔍 Token recibido en backend:", token);
  console.log("⏰ Hora actual backend:", new Date().toISOString());

  try {
    const user = await User.findOne({
      where: {
        reset_token: token,
        reset_token_expiration: { [Op.gt]: new Date() }, // token no expirado
      },
    });

    if (!user) {
      console.log("❌ Token inválido o expirado");
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    console.log("✅ Usuario encontrado para reset:", user.email);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.reset_token = null;
    user.reset_token_expiration = null;

    await user.save();

    console.log("✅ Contraseña actualizada con éxito para:", user.email);

    res.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error("❌ Error en resetPassword:", error);
    res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
};
