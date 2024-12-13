import "./HomePage.css";
import Intro from "./../../assets/intro2.mp4";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <div className="titulovideo">
        <video src={Intro} className="videointro" autoPlay loop />
        <div className="intro">
          <h1 className="fisiosport">FISIO SPORT</h1>
          <h2 className="kinesiologiayfisioterapia">Kinesiología & Fisioterapia</h2>
          <i><h3 className="kinesiologo">Klgo. Christian Núñez Coso</h3></i>
          <Link to="/turno">
  <button className="button">
    <span className="button-content">Solicitar turno</span>
  </button>
</Link>
        </div>

</div>

      </div>

  
  );
};

export default HomePage;
