import './ContactPage.css'



const ContactPage = () => { 
    return (
        <div>
            <div className="contactcontainer">
            <div className='contact'>
                <p id='pcontact'>¡Pongase en contacto con nosotros!</p> 
            <div className='agradecimientocontactocontenedor'>
                <p className="agradecimientocontacto">Estamos encantados de saber que tienes una consulta para nosotros.
              Valoramos tu tiempo y tu interés en nuestros servicios. Por favor,
              ten en cuenta que responderemos a tu consulta dentro de las
              próximas 24 horas hábiles. ¡Gracias por confiar en nosotros y por elegir nuestros
              servicios!</p>
              
            </div>
            <div className='input'>
                <input type= "text" placeholder="Nombre" name="name"/> 
                <input type="text" placeholder="Apellido" name="lastname"/> 
                <input type="text" placeholder="micorreo@gmail.com" name="email"/>
                <textarea
              name="asunto"
              id=""
              cols="30"
              rows="10"
              placeholder="Hola, quisiera hacerte una consulta sobre..."

              ></textarea>
              <button className="botonenviar">Enviar</button> 

            </div>
            </div>
            </div>
        </div>
    )
}

export default ContactPage