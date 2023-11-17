import "./HomePage.css";
import Intro from "./../../assets/intro.mp4";
import Christian from "./../../assets/christian.jpg";
import ContactPage from "./../ContactPage/ContactPage";
import { Link } from "react-router-dom";
import ComentariosImagen from "./../../assets/comentarios.png";
import PrimerComentario from './../../assets/comentario1.png'
import SegundoComentario from './../../assets/comentario5.png'
import TercerComentario from './../../assets/comentario3.png'
import CuartoComentario from './../../assets/comentario4.png'
import QuintoComentario from './../../assets/comentario2.png'
import SextoComentario from './../../assets/comentario6.png'
import NavBar from './../../components/NavBar/NavBar'

const HomePage = () => {
  return (
    <div>
        
      <video src={Intro} className="videointro" autoPlay loop/>
     
      
      <div className="container1">
        
        <img
          src={Christian}
          className="fotochristian"
          alt="Kinesiólogo de FisioSport"
        />
        <div className="textocontainer1">
          <p className="descripcionchristian">
          <h2 className="titulosobremi">SOBRE MÍ</h2>
          <hr />
          <br />
            <b className="holaatodos">¡Hola a todos!</b><br></br>
            <br></br>
            Me llamo Christian, tengo 33 años y soy Kinesiólogo, me recibí en el
            año 2016.<br></br>
            Estoy felizmente casado, tengo 2 hijos y una perrhija. Tengo un
            postgrado en Deportología de Alto Rendimiento y estoy constantemente
            actualizándome y capacitándome en este profesión que tanto me
            apasiona. Hace más de 6 años estoy a cargo del plantel superior de
            rugby del Club Cardenales y en el 2020 abrí mi consultorio en barrio
            Parque Centenario donde atiendo diariamente con turnos programados.
            <br></br>
            <br></br>
            Por consultas o mayor información podes contactarme{" "}
            <Link to={ContactPage} className="link">
              aquí.
            </Link>
          </p>
          <div className="comentarios">
            <div className="columna1">
          <img src={PrimerComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          <br></br>
          <img src={SegundoComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          <br></br>
          <img src={CuartoComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          </div>
          <div className="columna2">
          <img src={TercerComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          
          <br></br>
          <img src={QuintoComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          <br></br>
          <img src={SextoComentario} alt="Comentarios de Instagram" className="primercomentario"/>
          </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    
  );
};

export default HomePage;
