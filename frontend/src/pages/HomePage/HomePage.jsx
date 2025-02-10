import "./HomePage.css";
import Intro from "./../../assets/intro2.mp4";
import { Link } from "react-router-dom";
import osde from "./../../assets/Osde.png";
import iosfa from "./../../assets/Iosfa.png";
import smata from "./../../assets/smata.png";
import swiss from "./../../assets/Swiss.png";
import medife from "./../../assets/medife.png";
import ospjn from "./../../assets/ospjn.png";
import js from "./../../assets/js.png";
import red from "./../../assets/Red.png";
import tvsalud from "./../../assets/TV Salud.png";
import osseg from "./../../assets/osseg.png";
import sancor from "./../../assets/sancor.png";
import osjera from "./../../assets/osjera.png";
import ospf from "./../../assets/ospf.png";
import ospe from "./../../assets/ospe.png";
import osfatun from "./../../assets/osfatun.png";
import omint from "./../../assets/omint.png";
import bramed from "./../../assets/bramed.png";
import prevencion from "./../../assets/prevencion.png";
import subsidio from "./../../assets/subsidio.png";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
const HomePage = () => {
  const featurableWidgetId = "05c2bf91-e5c4-4b8f-872d-f05e7e70d502";
  return (
    <section className="container-principal">
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
        <div class="logos">
        <div class="logos-slide">
          <img src={osde} />
          <img src={iosfa} />
          <img src={smata} />
          <img src={swiss} />
          <img src={medife} />
          <img src={ospjn} />
          <img src={js} />
          <img src={red} />
          <img src={tvsalud} />
          <img src={osseg} />
          <img src={sancor} />
          <img src={osjera} />
          <img src={ospf} />
          <img src={ospe} />
          <img src={osfatun} />
          <img src={omint} />
          <img src={bramed} />
          <img src={prevencion} />
          <img src={subsidio} />
        </div>
        <div class="logos-slide">
          <img src={osde} />
          <img src={iosfa} />
          <img src={smata} />
          <img src={swiss} />
          <img src={medife} />
          <img src={ospjn} />
          <img src={js} />
          <img src={red} />
          <img src={tvsalud} />
          <img src={osseg} />
          <img src={sancor} />
          <img src={osjera} />
          <img src={ospf} />
          <img src={ospe} />
          <img src={osfatun} />
          <img src={omint} />
          <img src={bramed} />
          <img src={prevencion} />
          <img src={subsidio} />
        </div>

      </div>
      <div className="reviews"> 
      <ReactGoogleReviews className="reviews"layout="carousel" theme="dark" reviewVariant="testimonial" logoVariant="none"  featurableId={featurableWidgetId} />
      
  
    </div>
      </section>

  );
};

export default HomePage;
