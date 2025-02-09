import './ContactPage.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendContactMessage } from "../../Redux/Actions/Actions.js"; // Importa la acción

const ContactPage = () => {
    const dispatch = useDispatch(); // Hook para usar Redux
    const [message, setMessage] = useState({
        name: '',
        lastname: '',
        email: '',
        asunto: ''
    });

    const onChangeHandle = (event) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value
        });
    };

    const handleSendMessage = async () => {
        const response = await dispatch(sendContactMessage(message));
        
        if (response.success) {
            alert("Mensaje enviado correctamente");
            setMessage({ name: '', lastname: '', email: '', asunto: '' }); // Limpiar formulario
        } else {
            alert("Hubo un error al enviar el mensaje");
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-form">
                <h2 className='contactanos'>Contáctanos</h2>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Nombre" className="input-field-contact" onChange={onChangeHandle} value={message.name}/>
                    <input type="text" name="lastname" placeholder="Apellido" className="input-field-contact" onChange={onChangeHandle} value={message.lastname}/>
                    <input type="email" name="email" placeholder="micorreo@gmail.com" className="input-field-contact" onChange={onChangeHandle} value={message.email}/>
                    <textarea name="asunto" placeholder="Hola, quisiera hacerte una consulta sobre..." className="input-field-contact textarea" onChange={onChangeHandle} value={message.asunto}></textarea>
                    <button className="submit-button" onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
