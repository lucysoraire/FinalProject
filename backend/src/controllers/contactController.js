const nodemailer = require('nodemailer')

const sendMessageController = async (user) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'practiceapplications0@gmail.com',
            pass: process.env.pass,
        },
    });

    const mailOptions = {
        from: 'Remitente <practiceapplications0@gmail.com>',
        to: user.email,
        subject: `¡Alguien se quiere poner en contacto contigo!`,
        html: `
            <html>
            <body>
            <p>Hola ${user.name},</p>
            <p>¡Hemos recibido un mensaje de alguien interesado en contactarte! Por favor, revisa tus detalles de contacto y responde lo antes posible.</p>
            <p>Detalles de contacto:</p>
            <ul>
                <li>Nombre: ${user.name + ' ' + user.lastname}</li>
                <li>Correo electrónico: ${user.email}</li>
            </ul>
            <p>Mensaje:</p>
            <p>${user.asunto}</p>
            <p>¡Gracias!</p>
        </body>
            </html>`


    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo al cliente:', error);
    }
}

module.exports = {
    sendMessageController
}